import {Component, OnDestroy, OnInit} from '@angular/core';
import {PortfolioService} from './portfolio/portfolio.service';
import {Subscription} from 'rxjs';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private history: string[] = [];
  constructor (private portfolioService: PortfolioService,
               private sharedService: SharedService) {
  }
  private userBalance: number;
  private purchasedStocks: Array<Object>;
  title = 'stock-trader-app';

  ngOnInit() {
      this.sharedService.currentBalance.subscribe(balance => {
          this.userBalance = balance;
      });
    this.getUserBalance();
      this.sharedService.currentPurchasedStocks.subscribe(stocks => {
          this.purchasedStocks = stocks;
      });
    this.getPurchasedStocks();
  }

    getUserBalance() {
        this.portfolioService.getUserBalance().subscribe(balance => {
            this.userBalance = Number(balance['amount']);
            this.sharedService.changeUserBalance(this.userBalance);
        });
    }
    getPurchasedStocks() {
        this.portfolioService.getPurchasedStocks().subscribe((purchasedStocks: Array<Object>) => {
            this.purchasedStocks = purchasedStocks;
            this.sharedService.changePurchasedStocks(this.purchasedStocks);
            console.log('purchased stocks', this.purchasedStocks);
        });
    }
  ngOnDestroy() {
  }
}
