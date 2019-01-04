import { Action } from '@ngrx/store';
import { Market } from '../../models/market';


export enum MarketsActionTypes {
  LoadMarketsList = '[Markets] load list',
  LoadMarketsListSuccess = '[Markets] load list success',
  LoadMarketsListFail = '[Markets] load list fail',
  BuyMarket = '[Markets] buy stock',
  BuyMarketSuccess = '[Markets] buy stock success',
  BuyMarketFail = '[Markets] buy stock fail'
}

export class LoadMarketList implements Action {
  readonly type = MarketsActionTypes.LoadMarketsList;
}

export class LoadMarketsListSuccess implements Action {
  readonly type = MarketsActionTypes.LoadMarketsListSuccess;

  constructor (public payload: Market[]) {}
}

export class LoadMarketsListFail implements Action {
  readonly type = MarketsActionTypes.LoadMarketsListFail;

  constructor (public payload: Error) {}
}

export class BuyMarket implements Action {
  readonly type = MarketsActionTypes.BuyMarket;

  constructor (public payload: Market) {}
}

export class BuyMarketSuccess implements Action {
  readonly type = MarketsActionTypes.BuyMarketSuccess;

  constructor (public payload: Market) {}
}

export class BuyMarketFail implements Action {
  readonly type = MarketsActionTypes.BuyMarketFail;

  constructor (public payload: Error) {}
}


export type MarketsListActionsUnion =
  LoadMarketList
  | LoadMarketsListSuccess
  | LoadMarketsListFail
  | BuyMarket
  | BuyMarketSuccess
  | BuyMarketFail;
