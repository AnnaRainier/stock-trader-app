import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  navigateToStocksPage() {
    return browser.get('/markets');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getPageTitle() {
    return browser.getTitle();
  }
  getStocksNavivagion() {
    return element(by.xpath('//button[. = "Stocks"'));
  }
  getPortfolioNavigation() {
    return element(by.xpath('//button[. = "Portfolio"'));
  }
  getTraderBalance() {
    return element(by.id('trader-balance'));
  }
  getQuantityInputValue() {
    return element.all(by.css('.stock-purchase-quantity')).get(0).getAttribute('value');
  }
  getPurchaseBtnDisabled() {
    return element.all(by.css('.purchase-stock-btn')).get(0).getAttribute('disabled');
  }
}
