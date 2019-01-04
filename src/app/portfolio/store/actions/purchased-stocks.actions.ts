import { Action } from '@ngrx/store';
import { PurchasedStock } from '../../models/purchased-stock';

export enum PurchasedStocksActionTypes {
  LoadPurchasedStocks = '[Purchased stocks] load list',
  LoadPurchasedStocksSuccess = '[Purchased stocks] load list success',
  LoadPurchasedStocksFail = '[Purchased stocks] load list fail',
  BuyNewStock = '[Purchased stocks] buy new stock',
  BuyNewStockSuccess = '[Purchased stocks] buy new stock success',
  BuyNewStockFail = '[Purchased stocks] buy new stock fail',
  SellStock = '[Purchased stocks] sell stock',
  SellStockSuccess = '[Purchased stocks] sell stock success',
  SellStockFail = '[Purchased stocks] sell stock fail',
  RemoveStock = '[Purchased stocks] remove stock'
}

export class LoadPurchasedStocks implements Action {
  readonly type = PurchasedStocksActionTypes.LoadPurchasedStocks;
}

export class LoadPurchasedStocksSuccess implements Action {
  readonly type = PurchasedStocksActionTypes.LoadPurchasedStocksSuccess;

  constructor (public payload: PurchasedStock[]) {}
}

export class LoadPurchasedStocksFail implements Action {
  readonly type = PurchasedStocksActionTypes.LoadPurchasedStocksFail;

  constructor (public payload: Error) {}
}

export class BuyNewStock implements Action {
  readonly type = PurchasedStocksActionTypes.BuyNewStock;

  constructor (public payload: PurchasedStock) {}
}

export class BuyNewStockSuccess implements Action {
  readonly type = PurchasedStocksActionTypes.BuyNewStockSuccess;

  constructor (public payload: PurchasedStock) {}
}

export class BuyNewStockFail implements Action {
  readonly type = PurchasedStocksActionTypes.BuyNewStockFail;

  constructor (public payload: Error) {}
}

export class SellStock implements Action {
  readonly type = PurchasedStocksActionTypes.SellStock;

  constructor (public payload: PurchasedStock) {}
}

export class SellStockSuccess implements Action {
  readonly type = PurchasedStocksActionTypes.SellStockSuccess;

  constructor (public payload: PurchasedStock) {}
}

export class SellStockFail implements Action {
  readonly type = PurchasedStocksActionTypes.SellStockFail;

  constructor (public payload: Error) {}
}

export class RemoveStock implements Action {
  readonly type = PurchasedStocksActionTypes.RemoveStock;

  constructor (public payload: PurchasedStock) {}
}

export type PurchasedStocksActionsUnion =
  LoadPurchasedStocks
  | LoadPurchasedStocksSuccess
  | LoadPurchasedStocksFail
  | BuyNewStock
  | BuyNewStockSuccess
  | BuyNewStockFail
  | SellStock
  | SellStockSuccess
  | SellStockFail
  | RemoveStock;
