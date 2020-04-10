import { element, by, promise, ExpectedConditions, browser } from 'protractor';
import { Page } from './page';
export class MainPage extends Page {
    get url(): string {
        return '/';
    }
    isAt(): promise.Promise<boolean> {
        return element(by.cssContainingText('span', 'KINE')).isPresent();
    }
    getCurrentTime(): promise.Promise<string> {
        return element(by.css('.time')).getText();
    }
    waitForSimulatedTimeToBeDisplayed(): promise.Promise<any> {
        return browser.wait(() => this.getCurrentTime().then(time => time !== ''));
    }
    isConnectionEstablished(): promise.Promise<boolean> {
        return element(by.css('.link.OK')).isPresent();
    }
    getKineConnectionStatus(status: string): promise.Promise<any> {
        return browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText(`.status.${status}`, `Kine Server: ${status}`))));
    }
}