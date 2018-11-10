import { Injectable } from '@angular/core';
import {Subject, Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    constructor() { }
  // private userBalanceSource = new Subject<number>();
    private userBalanceSource = new BehaviorSubject(0);
    private purchasedStocksSource = new BehaviorSubject([]);

    currentBalance = this.userBalanceSource.asObservable();
    currentPurchasedStocks = this.purchasedStocksSource.asObservable();

    changePurchasedStocks(stocks: Array<Object>) {
      this.purchasedStocksSource.next(stocks);
    }
    changeUserBalance(newBalance: number) {
      this.userBalanceSource.next(newBalance);
    }

}
