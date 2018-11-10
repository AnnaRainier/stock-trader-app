import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {MarketsService, StockList} from './markets.service';
import {Subscription} from 'rxjs';
import {PortfolioService} from '../portfolio/portfolio.service';
import {SharedService} from '../shared.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnDestroy {
  // @Input() userBalance: number;
  // @Input() purchasedStocks: Array<Object>;
  constructor(private marketsService: MarketsService,
              private portfolioService: PortfolioService,
              private sharedService: SharedService) {
  }
  private userBalance: number;
  private purchasedStocks: Array<Object>;
  private stocksList: Array<Object>;
  private stocksSubscription: Subscription;
  private purchasedStocksSubscription: Subscription;
  private purchasedStocksUpdateSubscription: Subscription;
  private balanceSubscription: Subscription;
    dataSource: any;
    displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'category', 'action'];
  ngOnInit() {
      this.balanceSubscription = this.sharedService.currentBalance.subscribe((balance: number) => {
          this.userBalance = balance;
          console.log('markets knows user balance', this.userBalance);
      });
    this.getStocksList();
      this.purchasedStocksSubscription = this.sharedService.currentPurchasedStocks.subscribe(stocks => {
          this.purchasedStocks = stocks;
          // this.dataSource = this.purchasedStocks;
          console.log('markets know purchased stocks', this.purchasedStocks);
      });
  }

    getStocksList() {
      this.stocksSubscription = this.marketsService.getStocksList().subscribe((data: any) => {
       this.stocksList = data;
          console.log(data);
       this.dataSource = new MatTableDataSource(this.stocksList);
          this.dataSource.filterPredicate = function (dataSet, filter: string): boolean {
              return dataSet.category.toLowerCase().includes(filter);
          };
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
    getPurchasedStocks() {
        this.purchasedStocksUpdateSubscription = this.portfolioService.getPurchasedStocks().subscribe((purchasedStocks: Array<Object>) => {
            this.purchasedStocks = purchasedStocks;
            this.sharedService.changePurchasedStocks(this.purchasedStocks);
        });
    }
    buyStock(stock) {
      // console.log('stock', stock);
      const price = stock.price * stock.quantity;
      const purchasedStock = Object.assign({}, stock);
        purchasedStock.price = price;
       const stockInPurchased = this.determineIfStockInPurchased(stock);
       if (stockInPurchased) {
         purchasedStock['price'] += stockInPurchased['price'];
         purchasedStock['quantity'] += stockInPurchased['quantity'];
       };
       purchasedStock['price'] = this.marketsService.calcPriceWithTwoDecimals(purchasedStock['price']);
       const balanceLeft = this.userBalance - purchasedStock['price'];
       if (balanceLeft >= 0) {
         console.log('ok');
           this.userBalance = this.marketsService.calcPriceWithTwoDecimals(balanceLeft);
           this.sharedService.changeUserBalance(this.userBalance);
           console.log('stock', purchasedStock);
           console.log('balance after purchase', this.userBalance);
           this.marketsService.buyNewStock(purchasedStock, stockInPurchased).subscribe(resp => {
                   console.log('response', resp);
                   delete stock.quantity;
                   this.marketsService.updateUserBalance(this.userBalance).subscribe(response => {
                       console.log('resp', response);
                       this.getPurchasedStocks();
                   });
               },
               error => console.log('error', error));
       } else {
         alert('You don\'t have enough funds to make the purchase');
       }
    }
    applyFilterByCategory(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }
    ngOnDestroy() {
      this.stocksSubscription.unsubscribe();
      this.purchasedStocksSubscription.unsubscribe();
      this.balanceSubscription.unsubscribe();
      if (this.purchasedStocksUpdateSubscription) {
        this.purchasedStocksUpdateSubscription.unsubscribe();
      }
    }

}
