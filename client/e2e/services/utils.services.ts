import { promise, browser, protractor } from 'protractor';
import { LoginPage, MainPage, Page } from '../pages';
import * as fs from 'fs';
import * as path from 'path';
export const RED = 'rgba(201, 0, 5, 1)';
export const GREY = 'rgba(158, 159, 160, 1)';
export const GREEN = 'rgba(12, 127, 22, 1)';
export class TestUtils {
    private mongoClient;
    private request;
    private page: Page = new Page();
    private loginPage: LoginPage = new LoginPage();
    private mainPage: MainPage = new MainPage();
    constructor() {
        this.mongoClient = require('mongodb').MongoClient;
        this.request = require('request-promise');
    }
    goTo<P extends Page>(page: P): promise.Promise<P> {
        return browser.driver
            .wait(browser.driver.get(`${browser.baseUrl}${page.url}`))
            .then(() => {
                expect(this.page.isAt()).toBeTruthy();
            })
            .then(_ => page);
    }
    goToLogin() {
        return this.goTo(this.loginPage)
            .then(() => this.page.isLogged())
            .then(logged => (logged ? this.page.logout() : null));
    }
    logInAsOperator(): promise.Promise<boolean> {
        return this.logIn('operator');
    }
    logInAsViewer(): promise.Promise<boolean> {
        return this.logIn('viewer');
    }
    private logIn(role: string): promise.Promise<any> {
        return this.goToLogin()
            .then(_ => this.loginPage.setLogin(browser.params.users[role].username))
            .then(_ => this.loginPage.setPassword(browser.params.users[role].password))
            .then(_ => this.loginPage.clickLogin())
            .then(_ => expect(this.mainPage.isAt()).toBeTruthy());
    }
    deleteFileIfExists(filePath: string): void {
        const resolvedPath = path.resolve(filePath);
        if (fs.existsSync(resolvedPath)) {
            fs.unlinkSync(resolvedPath);
        }
    }
    deleteFilesIfExists(fileName: string, directoryPath: string): void {
        return this.parseFolder(fileName, directoryPath, true);
    }
    countFilesMatchingName(fileName: string, directoryPath: string): any {
        return this.parseFolder(fileName, directoryPath, false);
    }
    waitForFile(filePath: string): promise.Promise<any> {
        const resolvedPath = path.resolve(filePath);
        return browser.driver.wait(___ => fs.existsSync(resolvedPath), 10000);
    }
    disconnect(satelliteName: string) {
        this.callUnitTestApi(`${satelliteName}/disconnect`, 'Disconnect satellite', 'Error while disconnecting satellite');
    }
    resetData(data: any): promise.Promise<void> {
        const mainDeferred = protractor.promise.defer();
        this.mongoClient.connect(browser.params.path, (dbError, client) => {
            const db = client.db(browser.params.database);
            if (dbError) {
                return mainDeferred.reject(dbError);
            }
            db.dropDatabase((dropError, result) => {
                if (dropError) {
                    return mainDeferred.reject(dropError);
                }
                const promises = Object.keys(data)
                    .filter(key => 'files' !== key)
                    .map(collectionName => {
                        const deferred = protractor.promise.defer();
                        db.createCollection(collectionName, (collectionError, collectionCreated) => {
                            if (collectionError) {
                                return deferred.reject(collectionError);
                            }
                            collectionCreated.insertMany(data[collectionName], (insertError, insert) => {
                                if (insertError) {
                                    return deferred.reject(insertError);
                                }
                                deferred.fulfill(true);
                            });
                        });
                        return deferred.promise;
                    });
                protractor.promise
                    .all(promises)
                    .then(() => client.close())
                    .then(() => mainDeferred.fulfill(true));
            });
        });
        return mainDeferred.promise.then(_ => {
            this.callUnitTestApi('prepareTestSessions', 'Sessions prepared', 'Error while preparing sessions');
        });
    }
    private callUnitTestApi(uri: string, message: string, errorMessage: string) {
        const auth =
            'Basic ' +
            Buffer.from(browser.params.users.operator.username + ':' + browser.params.users.operator.password).toString('base64');
        this.request({
            method: 'PUT',
            uri: `${browser.baseUrl}kine/api/unit-test/${uri}`,
            headers: {
                Authorization: auth,
            },
        })
            .then(result => console.log(message))
            .catch(err => console.log(errorMessage, err));
    }
    private parseFolder(fileName: string, directoryPath: string, toDelete: boolean): any {
        const mainDeferred = protractor.promise.defer();
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return mainDeferred.reject(err);
            }
            let count = 0;
            for (const file of files) {
                if (file.startsWith(fileName)) {
                    count++;
                    if (toDelete) {
                        this.deleteFileIfExists(path.join(directoryPath, file));
                    }
                }
            }
            mainDeferred.fulfill(count);
        });
        return mainDeferred.promise;
    }
}