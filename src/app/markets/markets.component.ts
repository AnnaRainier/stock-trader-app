import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {MarketsService, StockList} from './markets.service';
import {Subscription} from 'rxjs';
import {PortfolioService} from '../portfolio/portfolio.service';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnDestroy {
  @Input() userBalance: number
  constructor(private marketsService: MarketsService,
              private portfolioService: PortfolioService,
              private sharedService: SharedService) {
      this.sharedService.userBalanceAnnounced$.subscribe((balance: number) => {
      this.userBalance = balance;
      console.log('markets know user balance', this.userBalance);
    });
  }
  private stocksList: StockList;
  private purchasedStocks: Array<Object>;
  private purchasedStocksSubscription: Subscription;
  private stocksSubscription: Subscription;
  private window: any = window;
    dataSource: StockList;
    displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'category', 'action'];
  ngOnInit() {
    this.getStocksList();
    this.getPurchasedStocks();
  }

    getStocksList() {
      this.stocksSubscription = this.marketsService.getStocksList().subscribe(data => {
       this.stocksList = data;
          console.log(data);
       this.dataSource = this.stocksList;
      });
    }
    getPurchasedStocks() {
        this.purchasedStocksSubscription = this.portfolioService.getPurchasedStocks().subscribe((purchasedStocks: Array<Object>) => {
          this.purchasedStocks = purchasedStocks;
          console.log('purchased stocks', this.purchasedStocks);
          this.window.purchasedStocks = this.purchasedStocks;
        });
    }
    determineIfStockInPurchased(stock) {
      if (this.purchasedStocks['length']) {
        const stockInPurchased = this.purchasedStocks.find(value => {
            return value['id'] === stock.id;
        });
        return stockInPurchased;
      } else {
          return false;
      }
    }
    buyStock(stock) {
      console.log('stock', stock);
      const price = stock.price * stock.quantity;
      const purchasedStock = Object.assign({}, stock);
        purchasedStock.price = price;
       const stockInPurchased = this.determineIfStockInPurchased(stock);
       if (stockInPurchased) {
         purchasedStock['price'] += stockInPurchased['price'];
         purchasedStock['quantity'] += stockInPurchased['quantity'];
       };
       purchasedStock['price'] = this.calcPriceWithTwoDecimals(purchasedStock['price']);
       this.userBalance = this.userBalance - purchasedStock['price'];
       this.sharedService.announceUserBalance(this.userBalance);
       console.log('stock', purchasedStock);
       console.log('balance after purchase', this.userBalance);
        this.marketsService.buyNewStock(purchasedStock, stockInPurchased).subscribe(resp => {
          console.log('response', resp);
        });
    }
    calcPriceWithTwoDecimals(price) {
      price = price * 100;
      price = Math.round(price);
      price = price / 100;
      return price;
    }
    ngOnDestroy() {
      this.stocksSubscription.unsubscribe();
      this.purchasedStocksSubscription.unsubscribe();
    }

}
