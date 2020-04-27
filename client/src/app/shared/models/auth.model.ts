export class AuthServiceConfiguration {
    baseUrl = '/auth';
    productInformations?: ProductInformations;
}

export interface LoginPassword {
    login: string;
    password: string;
    connector: string;
}

export interface Connector {
    id: string;
    name: string;
}

export interface ChangePassword {
    login: string;
    password: string;
    newPassword: string;
    newPasswordConfirmation: string;
    connector: string;
}

export interface User {
    name: string;
    login: string;
    email: string;
    roles: string[];
}

export interface ProductInformations {
    name?: string;
    logo?: string;
    version?: string;
}
