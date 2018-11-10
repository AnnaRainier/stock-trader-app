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
    this.sharedService.userBalanceAnnounced$.subscribe(balance => {
      this.history.push(`${balance} has been announced`);
      this.userBalance = balance;
      console.log('header gets changes', this.userBalance);
    });
  }
  private userBalance: number;
  private userBalanceSubscription: Subscription;
  title = 'stock-trader-app';

  ngOnInit() {
    this.userBalanceSubscription = this.portfolioService.getUserBalance().subscribe(balance => {
      this.userBalance = Number(balance['amount']);
      this.sharedService.announceUserBalance(this.userBalance);
      this.history.push(`${balance} has been changed`);
    });
  }

  ngOnDestroy() {
    this.userBalanceSubscription.unsubscribe();
  }
}
