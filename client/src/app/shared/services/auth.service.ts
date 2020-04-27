import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import {
    LoginPassword,
    ChangePassword,
    User,
    AuthServiceConfiguration,
    Connector,
    ProductInformations
} from '../../shared/models/index';

@Injectable()
export class AuthService {
    redirectUrl = '/dashboard';

    constructor(
        @Optional() private configuration: AuthServiceConfiguration,
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) {
        if (this.configuration === null) {
            this.configuration = new AuthServiceConfiguration();
        }
    }

    get baseUrl() {
        return this.configuration.baseUrl;
    }

    get productInformations(): ProductInformations {
        return this.configuration.productInformations;
    }

    get token(): string {
        return this.getStorage().getItem('token');
    }

    /**
     * Sets the authentication token in localStorage.
     * @param token - authentication token.
     */
    setToken(token: string): void {
        this.getStorage().setItem('token', token);
    }

    /**
     * Removes the authentication token from localStorage.
     */
    removeToken(): void {
        this.getStorage().removeItem('token');
    }

    private getStorage() {
        return localStorage;
    }

    /**
     * Checks if user is authenticated.
     */
    isAuthenticated(): boolean {
        return this.token && !this.jwtHelper.isTokenExpired(this.token);
    }

    /**
     * Authenticates a user.
     * @param loginPassword - login with password (cf. LoginPassword interface).
     */
    login(loginPassword: LoginPassword): Observable<string> {
        return this.post('', loginPassword);
    }

    /**
     * Logs out a user by removing its token.
     */
    logout() {
        this.removeToken();
    }

    /**
     * Changes a password.
     * @param changePassword - new password with confirmation (cf. ChangePassword interface).
     */
    changePassword(changePassword: ChangePassword): Observable<string> {
        return this.post('/change', changePassword);
    }

    private post(route: string, data: LoginPassword | ChangePassword): Observable<any> {
        return this.http
            .post<Response>(this.configuration.baseUrl + route, data)
            .pipe(
                map(this.extractData),
                catchError(this.handleError),
                map(user => {
                    this.setToken(user['token']);
                    return user['token'];
                })
            );
    }

    private get(route: string): Observable<any> {
        return this.http.get<Response>(this.configuration.baseUrl + route).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    private extractData(res: Response) {
        return res || {};
    }

    private handleError(error: any): Observable<never> {
        if (error.error) {
            const errMsg = (error.error && error.error.message)
                || (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
            return observableThrowError(errMsg);
        }
    }

    /**
     * Gets a user by decoding an authentication token.
     */
    getUser(): User {
        if (this.token) {
            const payload = this.jwtHelper.decodeToken(this.token);
            return {
                login: payload.sub,
                name: payload.name,
                email: payload.email,
                roles: payload.roles
            } as User;
        } else {
            return {} as User;
        }
    }

    /**
     * Gets all connectors available for the application (eg. Standard, LDAP...).
     */
    getConnectors(): Observable<Connector[]> {
        return this.get('/connectors');
    }

    /**
     * When token is about to expire, you can define a period of time and get
     * a boolean to check if token is IN or OUT of this period.
     * @param period - (minutes) Period of time where token is about to expire.
     */
    verify(period: number): Observable<boolean> {
        return this.http
            .get<any>(`${this.configuration.baseUrl}`)
            .pipe(map(() => this.checkExpiration(period)));
    }

    private checkExpiration(period: number): boolean {
        const current: number = new Date().getTime(),
            expiration: number = this.jwtHelper.getTokenExpirationDate(this.token).getTime(),
            periodInMs: number = period * 60000;
        return current >= expiration - periodInMs;
    }

    /**
     * Refreshes authentication token by replacing the old one by a new one.
     * Token must be valid while performing a refresh.
     */
    refresh(): Observable<any> {
        return this.http.get<any>(`${this.configuration.baseUrl}/refresh`);
    }

    get expirationDate(): Date {
        return this.jwtHelper.getTokenExpirationDate();
    }
}
