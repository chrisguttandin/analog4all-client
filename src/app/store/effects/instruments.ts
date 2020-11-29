import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mapTo, mergeMap } from 'rxjs/operators';
import { pluckPayloadOfType } from '../../operators';
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
    constructor(
        private _actions$: Actions,
        private _instrumentService: InstrumentService,
        private _instrumentsService: InstrumentsService
    ) {}

    @Effect() get fetchInstrument$(): Observable<IFetchInstrumentFailAction | IFetchInstrumentSuccessAction> {
        return this._actions$.pipe(
            pluckPayloadOfType(fetchInstrument),
            mergeMap((id) => this._instrumentService.fetch(id))
        );
    }

    @Effect() get fetchInstruments$(): Observable<IFetchInstrumentsFailAction | IFetchInstrumentsSuccessAction> {
        return this._actions$.pipe(
            ofType(fetchInstruments),
            mergeMap(() => this._instrumentsService.fetch())
        );
    }

    @Effect() get setIsFetchingInstrumentsToFalse$(): Observable<ISetIsFetchingInstrumentsAction> {
        return this._actions$.pipe(ofType(fetchInstrumentsFail, fetchInstrumentsSuccess), mapTo(setIsFetchingInstruments(false)));
    }

    @Effect() get setIsFetchingInstrumentsToTrue$(): Observable<ISetIsFetchingInstrumentsAction> {
        return this._actions$.pipe(ofType(fetchInstruments), mapTo(setIsFetchingInstruments(true)));
    }

    @Effect() get updateInstruments$(): Observable<IUpdateInstrumentsAction> {
        return this._actions$.pipe(pluckPayloadOfType(fetchInstrumentsSuccess), map(updateInstruments));
    }

    @Effect() get upsertInstrument$(): Observable<IUpsertInstrumentAction> {
        return this._actions$.pipe(pluckPayloadOfType(fetchInstrumentSuccess), map(upsertInstrument));
    }
}
