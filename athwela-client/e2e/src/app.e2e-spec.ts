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


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
