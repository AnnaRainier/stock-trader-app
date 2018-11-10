import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MarketsService, StockList} from '../markets/markets.service';
import {PortfolioService} from './portfolio.service';
import {SharedService} from '../shared.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {
    private purchasedStocks: Array<Object>;
    private userBalance: number;
    private totalPurchasedStocksPrice: number;
  constructor(private portfolioService: PortfolioService, private sharedService: SharedService,
              private marketsService: MarketsService) {
  }
    dataSource: Array<Object>;
    private balanceSubscription: Subscription;
    private purchasedStocksSubscription: Subscription;
    private stocksSubsctiption: Subscription;
    displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'sell-quantity', 'category', 'action'];
  ngOnInit() {
    this.balanceSubscription = this.sharedService.currentBalance.subscribe((balance: number) => {
        this.userBalance = balance;
        console.log('portfolio knows user balance', this.userBalance);
    });
      this.purchasedStocksSubscription = this.sharedService.currentPurchasedStocks.subscribe(stocks => {
        this.purchasedStocks = stocks;
        this.dataSource = this.purchasedStocks;
        console.log('portfolio knows purchased stocks', this.purchasedStocks);
        this.calculateTotalPurchasedPrice();
    });
  }
  calculateTotalPurchasedPrice() {
    let sum = 0;
    this.purchasedStocks.forEach(stock => {
      sum += stock['price'];
    });
    this.totalPurchasedStocksPrice = sum;
    console.log('total', this.totalPurchasedStocksPrice);
  }
  sellStock(stock) {
      const pricePerStock = stock.price / stock.quantity;
      const sellingPrice = this.marketsService.calcPriceWithTwoDecimals(pricePerStock * stock.sellQuantity);
      const sellingStock = Object.assign({}, stock);
      const sellQuantity = stock.quantity - stock.sellQuantity;
      delete sellingStock.sellQuantity;
      if (sellQuantity >= 0) {
        stock.quantity = sellQuantity;
        sellingStock.quantity = sellQuantity;
          this.userBalance = this.marketsService.calcPriceWithTwoDecimals(this.userBalance + sellingPrice);
          this.sharedService.changeUserBalance(this.userBalance);
          console.log('fine');
        this.portfolioService.sellStock(sellingStock, sellQuantity).subscribe(resp => {
          console.log('resp', resp);
          this.marketsService.updateUserBalance(this.userBalance).subscribe(response => {
            console.log('response', response);
          });
          this.getPurchasedStocks();
        },
            error => console.log('error', error));

        } else {
        alert(`You don\'t have enough stocks to sell ${stock.sellQuantity} stocks`);
      }
  }
    getPurchasedStocks() {
        this.stocksSubsctiption = this.portfolioService.getPurchasedStocks().subscribe((purchasedStocks: Array<Object>) => {
            this.purchasedStocks = purchasedStocks;
            this.sharedService.changePurchasedStocks(this.purchasedStocks);
            this.calculateTotalPurchasedPrice();
        });
    }
    ngOnDestroy() {
      this.balanceSubscription.unsubscribe();
     this.purchasedStocksSubscription.unsubscribe();
     if (this.stocksSubsctiption) {
         this.stocksSubsctiption.unsubscribe();
     }
    }

}
