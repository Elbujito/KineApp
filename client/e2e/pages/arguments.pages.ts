import { browser, element, by, promise, ExpectedConditions, ElementArrayFinder, Key } from 'protractor';
import { Page } from './page';
import { ElementFinder } from 'protractor/built/element';
export class ArgumentsPage extends Page {
    private getButton(className: string): promise.Promise<any> {
        return this.getArgumentsBox().then(box => box.element(by.className(className)));
    }
    getArgumentsBox(): promise.Promise<any> {
        const argumentsPanel = element(by.css('kine-arguments'));
        return browser.wait(ExpectedConditions.presenceOf(argumentsPanel)).then(() => argumentsPanel);
    }
    getArgumentsInputCount(className: string): ElementArrayFinder {
        return element(by.css('kine-arguments')).all(by.className(className));
    }
    getArgument(parameterName: string, inputTag: string): ElementFinder {
        return element(by.cssContainingText('tr', parameterName)).element(by.tagName(inputTag));
    }
    getArgumentWithStatus(parameterName: string, className: string): ElementFinder {
        return this.getArgument(parameterName, 'input').element(by.className(className));
    }
    getArgumentHeader(): ElementFinder {
        return element(by.cssContainingText('h1', 'Arguments:'));
    }
    getArgumentColor(parameterName: string, inputTag: string): promise.Promise<string> {
        return this.getArgument(parameterName, inputTag).getCssValue('color');
    }
    getArgumentValue(parameterName: string, inputTag: string): promise.Promise<string> {
        return this.getArgument(parameterName, inputTag).getAttribute('value');
    }
    getArgumentDescription(parameterName: string): promise.Promise<string> {
        return element(by.cssContainingText('tr', parameterName)).element(by.css('.argumentDescription')).getText();
    }
    getArgumentUnit(parameterName: string): promise.Promise<string> {
        return element(by.cssContainingText('tr', parameterName)).element(by.css('.unit')).getText();
    }
    getProcedureName(): promise.Promise<string> {
        return this.getArgumentHeader().getText();
    }
    setInput(argumentInputName: string, value: string): promise.Promise<void> {
        const input = this.getArgument(argumentInputName, 'input');
        return input
            .clear()
            .then(() => input.sendKeys(value))
            .then(() => input.sendKeys(Key.TAB)); // focus out
    }
    setSelect(argumentInputName: string, value: string): promise.Promise<void> {
        const input = this.getArgument(argumentInputName, 'select');
        return input.sendKeys(value).then(() => input.sendKeys(Key.TAB)); // focus out;
    }
    setFileInputPath(absolutePath: string): promise.Promise<void> {
        return element(by.css('input[type="file"]')).sendKeys(absolutePath);
    }
    getSubmitButton(): promise.Promise<any> {
        return this.getButton('button submit');
    }
    getCancelButton(): promise.Promise<any> {
        return this.getButton('button cancel');
    }
    getImportFileFromServerButton(): ElementFinder {
        return element(by.cssContainingText('button', 'Import from server'));
    }
    getPopupImportButton(): ElementFinder {
        return element(by.css('.modal-dialog')).element(by.cssContainingText('button', 'Import'));
    }
    waitArgumentsToBeLoaded(): promise.Promise<any> {
        return browser
            .wait(browser.findElement(by.className('scrollable')))
            .then(_ =>
                browser.wait(
                    ExpectedConditions.presenceOf(this.getArgumentsInputCount('OK').get(0)),
                    undefined,
                    'waits for arguments to be loaded'
                )
            );
    }
}