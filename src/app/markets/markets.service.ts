import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MarketsService {

    constructor(private http: HttpClient) { }
    private url: string = 'http://127.0.0.1:3000';


    getStocksList() {
        return this.http.get(`${this.url}/stocks`);
    }
    buyNewStock(stock, stockIsPurchased) {
      if (stockIsPurchased) {
        return this.http.put(`${this.url}/purchasedStocks/${stock.id}`, stock);
      } else {
        return this.http.post(`${this.url}/purchasedStocks`, stock);
      }
    }

    updateUserBalance(balance) {
      const newBalance = {
        amount: balance
      };
      return this.http.put(`${this.url}/initialBalance`, newBalance);
    }

    calcPriceWithTwoDecimals(price) {
        price = price * 100;
        price = Math.round(price);
        price = price / 100;
        return price;
    }
}
export interface StockList {
    [index: number]: { id: number;
        name: string;
        price: string;
        category: string,
        quantity?: number,
        sellQuantity?: number
    };
}
