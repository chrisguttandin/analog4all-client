import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
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
                ofType(FETCH_INSTRUMENT_FAIL, FETCH_INSTRUMENT_SUCCESS),
                filter<IFetchInstrumentFailAction | IFetchInstrumentSuccessAction>(({ payload, type }) => {
                    if (type === FETCH_INSTRUMENT_FAIL) {
                        return (payload === id);
                    }

                    // @todo TypeScript needs to be convinced that payload is of type IInstrument.
                    return (<IInstrument> payload).id === id;
                }),
                first(),
                mergeMap(({ payload, type }) => {
                    if (type === FETCH_INSTRUMENT_FAIL) {
                        this._router.navigate([ '/' ]);

                        return empty<IInstrument>();
                    }

                    // @todo TypeScript needs to be convinced that payload is of type IInstrument.
                    return of(<IInstrument> payload);
                })
            );
    }

}
