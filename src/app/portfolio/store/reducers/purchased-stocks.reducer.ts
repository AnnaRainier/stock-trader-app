import { PurchasedStocksActionTypes, PurchasedStocksActionsUnion } from '../actions/purchased-stocks.actions';
import { PurchasedStock } from '../../models/purchased-stock';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';


export interface PurchasedStocksState extends EntityState<PurchasedStock>{
  loading: boolean;
  loaded: boolean;
  error: Error;
}

export const adapter = createEntityAdapter<PurchasedStock>();

export const initialState: PurchasedStocksState = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null
});

export function purchasedStocksReducer(state = initialState, action: PurchasedStocksActionsUnion): PurchasedStocksState {
  switch (action.type) {
    case PurchasedStocksActionTypes.LoadPurchasedStocks: {
      return {...state, loading: true, loaded: false, error: null};
    }

    case PurchasedStocksActionTypes.LoadPurchasedStocksSuccess: {
      return adapter.addAll(action.payload, {...state, loaded: true, loading: false, error: null});
    }

    case PurchasedStocksActionTypes.LoadPurchasedStocksFail: {
      return {...state, loading: false, loaded: true, error: action.payload};
    }

    case PurchasedStocksActionTypes.BuyNewStock: {
      return {...state, loading: true, loaded: false, error: null};
    }

    case PurchasedStocksActionTypes.BuyNewStockSuccess: {
      return adapter.addOne(action.payload, {...state, loaded: true, loading: false, error: null});
    }

    case PurchasedStocksActionTypes.BuyNewStockFail: {
      return {...state, loading: false, loaded: true, error: action.payload};
    }

    case PurchasedStocksActionTypes.SellStock: {
      return {...state, loading: true, loaded: false, error: null};
    }

    case PurchasedStocksActionTypes.SellStockSuccess: {
      return adapter.updateOne({id: action.payload.id, changes: action.payload},
        {...state, loading: true, loaded: false, error: null});
    }

    case PurchasedStocksActionTypes.SellStockFail: {
      return {...state, loading: false, loaded: true, error: action.payload};
    }

    default: {
      return state;
    }
  }

}

