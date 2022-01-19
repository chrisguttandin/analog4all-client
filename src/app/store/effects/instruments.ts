import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mapTo, mergeMap } from 'rxjs';
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
    // eslint-disable-next-line unicorn/consistent-function-scoping
    public fetchInstrument$ = createEffect(() =>
        this._actions$.pipe(
            pluckPayloadOfType(fetchInstrument),
            mergeMap((id) => this._instrumentService.fetch(id))
        )
    );

    // eslint-disable-next-line unicorn/consistent-function-scoping
    public fetchInstruments$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fetchInstruments),
            mergeMap(() => this._instrumentsService.fetch())
        )
    );

    public setIsFetchingInstrumentsToFalse$ = createEffect(
        // eslint-disable-next-line unicorn/consistent-function-scoping
        () => this._actions$.pipe(ofType(fetchInstrumentsFail, fetchInstrumentsSuccess), mapTo(setIsFetchingInstruments(false)))
    );

    public setIsFetchingInstrumentsToTrue$ = createEffect(
        // eslint-disable-next-line unicorn/consistent-function-scoping
        () => this._actions$.pipe(ofType(fetchInstruments), mapTo(setIsFetchingInstruments(true)))
    );

    public updateInstruments$ = createEffect(
        // eslint-disable-next-line unicorn/consistent-function-scoping
        () => this._actions$.pipe(pluckPayloadOfType(fetchInstrumentsSuccess), map(updateInstruments))
    );

    // eslint-disable-next-line unicorn/consistent-function-scoping
    public upsertInstrument$ = createEffect(() => this._actions$.pipe(pluckPayloadOfType(fetchInstrumentSuccess), map(upsertInstrument)));

    constructor(
        private _actions$: Actions,
        private _instrumentService: InstrumentService,
        private _instrumentsService: InstrumentsService
    ) {}
}
