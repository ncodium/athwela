import { browser, by, element, ElementFinder } from 'protractor';
import { ProtractorLocator } from 'protractor/built/locators';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.display-1')).getText() as Promise<string>;
  }

  getFooterText() {
    return element(by.css('p.text-center')).getText() as Promise<string>;
  }

  getModalTitle() {
    return element(by.css('.modal-title')).getText() as Promise<string>;
  }

  clickRegisterLink() {
    return element(by.linkText('Register')).click() as Promise<null>;
  }

  clickRegisterButton() {
    return element(by.buttonText('Register')).click() as Promise<null>;
  }

  getAlertText() {
    return element(by.css('.alert')).getText() as Promise<string>;
  }

}
