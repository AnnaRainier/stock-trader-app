import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PurchasedStocksState } from '../reducers/purchased-stocks.reducer';
import {PurchasedStocksActionTypes} from '../actions/purchased-stocks.actions';

@Injectable()
export class PurchasedStocksEffects {
  constructor(private actions$: Actions,
              private store: Store<PurchasedStocksState>) {}


  @Effect()
  getPurchasedStocksList$ = this.actions$.pipe(
    ofType(PurchasedStocksActionTypes.LoadPurchasedStocks),
    switchMap(() => {
      return this.
    })
  )
}


