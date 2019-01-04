import {MarketsActionTypes, MarketsListActionsUnion} from '../actions/markets.actions';
import {Market} from '../../models/market';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';


export interface MarketsState extends EntityState<Market>{
  loading: boolean;
  loaded: boolean;
  error: Error;
}

export const adapter: EntityAdapter<Market> = createEntityAdapter<Market>();

export const initialState: MarketsState = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null
});

export function marketsReducer(state = initialState, action: MarketsListActionsUnion): MarketsState {
  switch (action.type) {
    case MarketsActionTypes.LoadMarketsList: {
     return  {...state, loading: true, loaded: false, error: null};
    }

    case MarketsActionTypes.LoadMarketsListSuccess: {
      return adapter.addAll(action.payload, {...state, loading: false, loaded: true, error: null});
    }

    case MarketsActionTypes.LoadMarketsListFail: {
      return {...state, loading: false, loaded: true, error: action.payload};
    }

    case MarketsActionTypes.BuyMarket: {
      return {...state, loading: true, loaded: false, error: null};
    }

    case MarketsActionTypes.BuyMarketSuccess: {
      return {...state, loading: false, loaded: true, error: null};
    }

    case MarketsActionTypes.BuyMarketFail: {
      return {...state, loading: false, loaded: false, error: action.payload};
    }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: MarketsState) => state.loading;
export const getLoaded = (state: MarketsState) => state.loaded;
export const getError = (state: MarketsState) => state.error;
