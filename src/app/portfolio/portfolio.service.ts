import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StockList} from '../markets/markets.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {SharedService} from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }
    private apiUrl: string = 'http://127.0.0.1:3000';
    getPurchasedStocks() {
        return this.http.get(`${this.apiUrl}/purchasedStocks`);
    }
    getUserBalance() {
      return this.http.get(`${this.apiUrl}/initialBalance`);
    }

}
