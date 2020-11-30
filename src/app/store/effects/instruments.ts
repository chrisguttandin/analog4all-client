import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
import { InstrumentService, InstrumentsService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class InstrumentsEffects {
    public fetchInstrument$ = createEffect(() =>
        this._actions$.pipe(
            pluckPayloadOfType(fetchInstrument),
            mergeMap((id) => this._instrumentService.fetch(id))
        )
    );

    public fetchInstruments$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fetchInstruments),
            mergeMap(() => this._instrumentsService.fetch())
        )
    );

    public setIsFetchingInstrumentsToFalse$ = createEffect(() =>
        this._actions$.pipe(ofType(fetchInstrumentsFail, fetchInstrumentsSuccess), mapTo(setIsFetchingInstruments(false)))
    );

    public setIsFetchingInstrumentsToTrue$ = createEffect(() =>
        this._actions$.pipe(ofType(fetchInstruments), mapTo(setIsFetchingInstruments(true)))
    );

    public updateInstruments$ = createEffect(() =>
        this._actions$.pipe(pluckPayloadOfType(fetchInstrumentsSuccess), map(updateInstruments))
    );

    public upsertInstrument$ = createEffect(() => this._actions$.pipe(pluckPayloadOfType(fetchInstrumentSuccess), map(upsertInstrument)));
    constructor(
        private _actions$: Actions,
        private _instrumentService: InstrumentService,
        private _instrumentsService: InstrumentsService
    ) {}
}
