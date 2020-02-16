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

  getTitle() {
    return element(by.css('.mb-5')).getText() as Promise<string>;
  }

  clickRegisterLink() {
    return element(by.linkText('Register')).click() as Promise<null>;
  }

  clickSignInLink() {
    return element(by.linkText('Sign in')).click() as Promise<null>;
  }

  clickRegisterButton() {
    return element(by.buttonText('Register')).click() as Promise<null>;
  }

  clickSignInButton() {
    return element(by.buttonText('Sign in')).click() as Promise<null>;
  }

  isSignInButtonEnabled() {
    return element(by.buttonText('Sign in')).isEnabled() as Promise<boolean>;
  }

  getAlertText() {
    return element(by.css('.alert')).getText() as Promise<string>;
  }

  getUsernameAlertText() {
    return element(by.css('.invalid-feedback')).getText() as Promise<string>;
  }

  getEmailAlertText() {
    return element(by.css('.invalid-feedback')).getText() as Promise<string>;
  }

  getInvalidFeedbackAlertText() {
    return element(by.css('.invalid-feedback')).getText() as Promise<string>;
  }

  getPasswordAlertText() {
    return element(by.cssContainingText('.invalid-feedback', 'match')).getText() as Promise<string>;
  }

  sendUsername(username: string) {
    return element(by.id('inputUsername')).sendKeys(username) as Promise<null>;
  }

  sendEmail(username: string) {
    return element(by.id('inputEmail')).sendKeys(username) as Promise<null>;
  }

  sendPassword(password: string) {
    return element(by.id('inputPassword')).sendKeys(password) as Promise<null>;
  }

  sendConfirmPassword(password: string) {
    return element(by.id('inputConfirmPassword')).sendKeys(password) as Promise<null>;
  }

}
