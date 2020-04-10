import { element, by, promise, ElementFinder, browser, ExpectedConditions } from 'protractor';
export class Page {
    get url(): string {
        return '/';
    }
    getFullUrl(): string {
        return browser.baseUrl + this.url;
    }
    assertFullUrl(): promise.Promise<this> {
        return browser
            .getCurrentUrl()
            .then(currentUrl => {
                expect(currentUrl).toEqual(this.getFullUrl());
            })
            .then(_ => this);
    }
    isAt(): any {
        return true;
    }
    logout(): promise.Promise<void> {
        return element(by.id('logout')).click();
    }
    protected getUserElement(): ElementFinder {
        return element(by.id('user'));
    }
    isLogged(): promise.Promise<boolean> {
        return this.getUserElement().isPresent();
    }
    getUserName(): promise.Promise<string> {
        return this.getUserElement().getText();
    }
    getUserDetails(): promise.Promise<string> {
        return this.getUserElement().getAttribute('title');
    }
    waitForElementToBeClickable(elementFinder: ElementFinder): promise.Promise<any> {
        return browser.wait(ExpectedConditions.elementToBeClickable(elementFinder));
    }
    waitForPopupToBePresent(timeout: number, errorMessage: string): promise.Promise<any> {
        return browser.wait(ExpectedConditions.alertIsPresent(), timeout, errorMessage);
    }
    switchToAlertAndAccept(): promise.Promise<void> {
        return browser
            .switchTo()
            .alert()
            .accept();
    }
    getAlertTextMessage(): promise.Promise<string> {
        return browser
            .switchTo()
            .alert()
            .getText();
    }
    elementDoesNotExist(cssSelector: string, name: string): any {
        return element.all(by.cssContainingText(cssSelector, name)).then(items => expect(items.length).toEqual(0));
    }
    buttonWithGivenTitleDoesNotExist(titleName: string): any {
        return expect(element(by.css(`button[title="${titleName}"]`)).isPresent()).toBeFalsy();
    }
}