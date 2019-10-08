import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {
    fetchInstrument,
    fetchInstrumentSuccess,
    fetchInstruments,
    fetchInstrumentsFail,
    fetchInstrumentsSuccess,
    setIsFetchingInstruments,
    updateInstruments,
    upsertInstrument
} from '../actions';
import {
    IFetchInstrumentFailAction,
    IFetchInstrumentSuccessAction,
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
                ofType(fetchInstrument),
                mergeMap(({ payload: id }) => this._instrumentService.fetch(id))
            );
    }

    @Effect() get fetchInstruments$ (): Observable<IFetchInstrumentsFailAction | IFetchInstrumentsSuccessAction> {
        return this._actions$
            .pipe(
                ofType(fetchInstruments),
                mergeMap(() => this._instrumentsService.fetch())
            );
    }

    @Effect() get setIsFetchingInstrumentsToFalse$ (): Observable<ISetIsFetchingInstrumentsAction> {
        return this._actions$
            .pipe(
                ofType(fetchInstrumentsFail, fetchInstrumentsSuccess),
                map(() => setIsFetchingInstruments(false))
            );
    }

    @Effect() get setIsFetchingInstrumentsToTrue$ (): Observable<ISetIsFetchingInstrumentsAction> {
        return this._actions$
            .pipe(
                ofType(fetchInstruments),
                map(() => setIsFetchingInstruments(true))
            );
    }

    @Effect() get updateInstruments$ (): Observable<IUpdateInstrumentsAction> {
        return this._actions$
            .pipe(
                ofType(fetchInstrumentsSuccess),
                map(({ payload: instruments }) => updateInstruments(instruments))
            );
    }

    @Effect() get upsertInstrument$ (): Observable<IUpsertInstrumentAction> {
        return this._actions$
            .pipe(
                ofType(fetchInstrumentSuccess),
                map(({ payload: instrument }) => upsertInstrument(instrument))
            );
    }

}
