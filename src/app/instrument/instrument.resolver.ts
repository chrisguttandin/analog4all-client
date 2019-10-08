import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, first, mergeMap } from 'rxjs/operators';
import { TAppState, TInstrument, fetchInstrument, fetchInstrumentFail, fetchInstrumentSuccess } from '../store';

@Injectable({
    providedIn: 'root'
})
export class InstrumentResolver implements Resolve<TInstrument> {

    constructor (
        private _actions: Actions,
        private _router: Router,
        private _store: Store<TAppState>
    ) { }

    public resolve (activatedRoute: ActivatedRouteSnapshot): Observable<TInstrument> {
        const id = activatedRoute.params.id;

        this._store.dispatch(fetchInstrument(id));

        return this._actions
            .pipe(
                ofType(fetchInstrumentFail, fetchInstrumentSuccess),
                filter(({ payload, type }) => {
                    if (type === fetchInstrumentFail.type) {
                        return (payload === id);
                    }

                    // @todo TypeScript needs to be convinced that payload is of type TInstrument.
                    return (<TInstrument> payload).id === id;
                }),
                first(), // tslint:disable-line:rxjs-no-unsafe-first
                mergeMap(({ payload, type }) => {
                    if (type === fetchInstrumentFail.type) {
                        this._router.navigate([ '/' ]);

                        return EMPTY;
                    }

                    // @todo TypeScript needs to be convinced that payload is of type TInstrument.
                    return of(<TInstrument> payload);
                })
            );
    }

}
