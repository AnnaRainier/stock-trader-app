import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have correct title', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('StockTraderApp');
  });

  it('should have navigation', () => {
    page.navigateTo();
    expect(page.getStocksNavivagion() && page.getPortfolioNavigation());
  });

  it('should have user balance', () => {
    page.navigateTo();
    expect(page.getTraderBalance());
  });
  it('should disable purchase btn, if quantity of purchase is empty', () => {
    page.navigateToStocksPage();
    expect(page.getQuantityInputValue()).toBe('');
    expect(page.getPurchaseBtnDisabled()).toBe('true');
  });
});
