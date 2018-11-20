import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, first, mergeMap } from 'rxjs/operators';
import { FETCH_INSTRUMENT_FAIL, FETCH_INSTRUMENT_SUCCESS, fetchInstrument } from '../store/actions';
import { IAppState, IFetchInstrumentFailAction, IFetchInstrumentSuccessAction, IInstrument } from '../store/interfaces';

@Injectable()
export class InstrumentResolver implements Resolve<IInstrument> {

    constructor (
        private _actions: Actions,
        private _router: Router,
        private _store: Store<IAppState>
    ) { }

    public resolve (activatedRoute: ActivatedRouteSnapshot): Observable<IInstrument> {
        const id = activatedRoute.params.id;

        this._store.dispatch(fetchInstrument(id));

        return this._actions
            .pipe(
                ofType<IFetchInstrumentFailAction | IFetchInstrumentSuccessAction>(FETCH_INSTRUMENT_FAIL, FETCH_INSTRUMENT_SUCCESS),
                filter(({ payload, type }) => {
                    if (type === FETCH_INSTRUMENT_FAIL) {
                        return (payload === id);
                    }

                    // @todo TypeScript needs to be convinced that payload is of type IInstrument.
                    return (<IInstrument> payload).id === id;
                }),
                first(), // tslint:disable-line:rxjs-no-unsafe-first
                mergeMap(({ payload, type }) => {
                    if (type === FETCH_INSTRUMENT_FAIL) {
                        this._router.navigate([ '/' ]);

                        return EMPTY;
                    }

                    // @todo TypeScript needs to be convinced that payload is of type IInstrument.
                    return of(<IInstrument> payload);
                })
            );
    }

}
