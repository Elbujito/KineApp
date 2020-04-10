import { element, by, promise, ElementFinder } from 'protractor';
import { Page } from './page';
export class LoginPage extends Page {
    get url(): string {
        return '/login';
    }
    isAt(): promise.Promise<boolean> {
        return element(by.name('login')).isPresent();
    }
    setLogin(login): promise.Promise<void> {
        const input = element(by.name('login'));
        return input.clear().then(() => input.sendKeys(login));
    }
    setPassword(password): promise.Promise<void> {
        const input = element(by.name('password'));
        return input.clear().then(() => input.sendKeys(password));
    }
    getError(): promise.Promise<string> {
        return element(by.css('.error')).getText();
    }
    private getLoginButton(): ElementFinder {
        return element(by.cssContainingText('button', 'Log in'));
    }
    isLoginEnabled(): promise.Promise<boolean> {
        return this.getLoginButton().isEnabled();
    }
    clickLogin(): promise.Promise<void> {
        return this.getLoginButton().click();
    }
}