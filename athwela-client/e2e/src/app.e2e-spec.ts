import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Help those in need.');
  });

  it('should display footer text', () => {
    page.navigateTo();
    expect(page.getFooterText()).toEqual('Copyright © Athwela 2020');
  });

  it('should open register modal', () => {
    page.navigateTo();
    page.clickRegisterLink();
    expect(page.getModalTitle()).toEqual('Register on Athwela');
  });

  it('should fail registration on invalid submission', () => {
    page.navigateTo();
    page.clickRegisterLink();
    page.clickRegisterButton();
    expect(page.getAlertText()).toEqual('Registration failed');
  });

  it('should fail if username already exists', () => {
    page.navigateTo();
    page.clickRegisterLink();
    page.clickRegisterButton();
    page.sendUsername('admin');
    expect(page.getUsernameAlertText()).toEqual('admin is taken. Try another username.');
  });

  it('should fail if email format is invalid', () => {
    page.navigateTo();
    page.clickRegisterLink();
    page.clickRegisterButton();
    page.sendUsername('validusername');
    page.sendEmail('invalidemail');
    expect(page.getEmailAlertText()).toEqual('Enter a valid e-mail address.');
  });

  it('should fail if passwords does not match', () => {
    page.navigateTo();
    page.clickRegisterLink();
    page.clickRegisterButton();
    page.sendUsername('validusername');
    page.sendEmail('validemail@gmail.com');
    page.sendPassword('password1');
    page.sendConfirmPassword('password2');
    expect(page.getPasswordAlertText()).toEqual("Your passwords don't match. Please try again.");
  });

  it('should open sign-in modal', () => {
    page.navigateTo();
    page.clickSignInLink();
    expect(page.getModalTitle()).toEqual('Sign in to Athwela');
  });

  it('should disable sign-in on invalid submission', () => {
    page.navigateTo();
    page.clickSignInLink();
    expect(page.isSignInButtonEnabled()).toEqual(false);
  });

  it('should fail if password is missing', () => {
    page.navigateTo();
    page.clickSignInLink();
    page.sendUsername('valid');
    page.sendPassword('');
    page.sendUsername('username');
    expect(page.getInvalidFeedbackAlertText()).toEqual("Please provide your password.");
  });

  it('should fail if username is missing', () => {
    page.navigateTo();
    page.clickSignInLink();
    page.sendUsername('');
    page.sendPassword('validpassword');
    expect(page.getInvalidFeedbackAlertText()).toEqual("Please type in your username.");
  });

  it('should enable sign-in on valid submission', () => {
    page.navigateTo();
    page.clickSignInLink();
    page.sendUsername('validusername');
    page.sendPassword('validpassword');
    expect(page.isSignInButtonEnabled()).toEqual(true);
  });

  it('should redirect to profile on valid submission', () => {
    page.navigateTo();
    page.clickSignInLink();
    page.sendUsername('user');
    page.sendPassword('user');
    page.clickSignInButton();
    expect(page.getTitle()).toEqual('Anjula Lakshan');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
