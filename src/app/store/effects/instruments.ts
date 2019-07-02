import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {
    FETCH_INSTRUMENT,
    FETCH_INSTRUMENTS,
    FETCH_INSTRUMENTS_FAIL,
    FETCH_INSTRUMENTS_SUCCESS,
    FETCH_INSTRUMENT_SUCCESS,
    setIsFetchingInstruments,
    updateInstruments,
    upsertInstrument
} from '../actions';
import {
    IFetchInstrumentAction,
    IFetchInstrumentFailAction,
    IFetchInstrumentSuccessAction,
    IFetchInstrumentsAction,
    IFetchInstrumentsFailAction,
    IFetchInstrumentsSuccessAction,
    ISetIsFetchingInstrumentsAction,
    IUpdateInstrumentsAction,
    IUpsertInstrumentAction
} from '../interfaces';
import { InstrumentService, InstrumentsService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class InstrumentsEffects {

    constructor (
        private _actions$: Actions,
        private _instrumentService: InstrumentService,
        private _instrumentsService: InstrumentsService
    ) { }

    @Effect() get fetchInstrument$ (): Observable<IFetchInstrumentFailAction | IFetchInstrumentSuccessAction> {
        return this._actions$
            .pipe(
                ofType<IFetchInstrumentAction>(FETCH_INSTRUMENT),
                mergeMap(({ payload: id }) => this._instrumentService.fetch(id))
            );
    }

    @Effect() get fetchInstruments$ (): Observable<IFetchInstrumentsFailAction | IFetchInstrumentsSuccessAction> {
        return this._actions$
            .pipe(
                ofType<IFetchInstrumentsAction>(FETCH_INSTRUMENTS),
                mergeMap(() => this._instrumentsService.fetch())
            );
    }

    @Effect() get setIsFetchingInstrumentsToFalse$ (): Observable<ISetIsFetchingInstrumentsAction> {
        return this._actions$
            .pipe(
                ofType<IFetchInstrumentsAction>(FETCH_INSTRUMENTS_FAIL, FETCH_INSTRUMENTS_SUCCESS),
                map(() => setIsFetchingInstruments(false))
            );
    }

    @Effect() get setIsFetchingInstrumentsToTrue$ (): Observable<ISetIsFetchingInstrumentsAction> {
        return this._actions$
            .pipe(
                ofType<IFetchInstrumentsAction>(FETCH_INSTRUMENTS),
                map(() => setIsFetchingInstruments(true))
            );
    }

    @Effect() get updateInstruments$ (): Observable<IUpdateInstrumentsAction> {
        return this._actions$
            .pipe(
                ofType<IFetchInstrumentsSuccessAction>(FETCH_INSTRUMENTS_SUCCESS),
                map(({ payload: instruments }) => updateInstruments(instruments))
            );
    }

    @Effect() get upsertInstrument$ (): Observable<IUpsertInstrumentAction> {
        return this._actions$
            .pipe(
                ofType<IFetchInstrumentSuccessAction>(FETCH_INSTRUMENT_SUCCESS),
                map(({ payload: instrument }) => upsertInstrument(instrument))
            );
    }

}
