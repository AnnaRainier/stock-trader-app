import { adapter } from '../reducers/markets.reducer';
import { selectMarketsListState } from '../index';

export const {
  selectAll: loadMarketsList
} = adapter.getSelectors(selectMarketsListState);
