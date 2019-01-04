import { Market } from '../../markets/models/market';

export interface PurchasedStock extends Market {
  quantity: number;
}
