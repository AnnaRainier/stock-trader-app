import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
    sellStock(stock, sellingQuantity) {
          if (sellingQuantity > 0) {
              return this.http.put(`${this.apiUrl}/purchasedStocks/${stock.id}`, stock);
          } else {
            return this.http.delete(`${this.apiUrl}/purchasedStocks/${stock.id}`);
      }
    }

}
