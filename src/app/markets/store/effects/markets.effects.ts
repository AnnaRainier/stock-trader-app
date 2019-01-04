import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';


import {
  LoadMarketsListFail,
  LoadMarketsListSuccess,
  MarketsActionTypes
} from '../actions/markets.actions';
import {MarketsState} from '../reducers/markets.reducer';
import {MarketsService} from '../../markets.service';

@Injectable()
export class MarketsEffects {
  constructor(private actions$: Actions,
              private marketsService: MarketsService,
              private store: Store<MarketsState>) {}

  @Effect()
  getMarketsList$ = this.actions$.pipe(
    ofType(MarketsActionTypes.LoadMarketsList),
    switchMap(() => {
      return this.marketsService.getStocksList().pipe(
        map((res) => new LoadMarketsListSuccess(res)),
        catchError((error) => of(new LoadMarketsListFail(error)))
      );
    })
  );

}




