import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { marketsReducer, MarketsState as MarketsListState } from './reducers/markets.reducer';


export interface State {
  markets: MarketsState;
}

export interface MarketsState {
  marketsList: MarketsListState;
 // purchasedStocksList:
}

export const marketsReducers: ActionReducerMap<MarketsState> = {
  marketsList: marketsReducer
};

export const selectMarketsState = createFeatureSelector<MarketsState>('markets');
export const selectMarketsListState = createSelector(selectMarketsState, state => state.marketsList);


