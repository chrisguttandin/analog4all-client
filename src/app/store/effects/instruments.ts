import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap } from 'rxjs/operators';
import { FETCH_INSTRUMENT, FETCH_INSTRUMENT_SUCCESS, upsertInstrument } from '../actions';
import { IFetchInstrumentAction, IFetchInstrumentFailAction, IFetchInstrumentSuccessAction, IUpsertInstrumentAction } from '../interfaces';
import { InstrumentService } from '../services';

@Injectable()
export class InstrumentsEffects {

    constructor (
        private _actions$: Actions,
        private _instrumentService: InstrumentService
    ) { }

    @Effect() public get fetchInstrument$ (): Observable<IFetchInstrumentFailAction | IFetchInstrumentSuccessAction> {
        return this._actions$
            .pipe(
                ofType<IFetchInstrumentAction>(FETCH_INSTRUMENT),
                mergeMap(({ payload: id }) => this._instrumentService.fetch(id))
            );
    }

    @Effect() public get upsertInstrument$ (): Observable<IUpsertInstrumentAction> {
        return this._actions$
            .pipe(
                ofType<IFetchInstrumentSuccessAction>(FETCH_INSTRUMENT_SUCCESS),
                map(({ payload: instrument }) => upsertInstrument(instrument))
            );
    }

}
