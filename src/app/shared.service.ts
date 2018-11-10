import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    constructor() { }
  private userBalanceSource = new Subject<number>();

    userBalanceAnnounced$ = this.userBalanceSource.asObservable();

    announceUserBalance(balance: number) {
      this.userBalanceSource.next(balance);
    }

}
