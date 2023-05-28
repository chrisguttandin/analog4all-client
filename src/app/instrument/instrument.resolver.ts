import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, filter, first, mergeMap, of } from 'rxjs';
import { TAppState, TInstrument, fetchInstrument, fetchInstrumentFail, fetchInstrumentSuccess } from '../store';

export const resolveInstrument = (activatedRoute: ActivatedRouteSnapshot): Observable<TInstrument> => {
    const actions = inject(Actions);
    const router = inject(Router);
    const store = inject(Store<TAppState>);
    // eslint-disable-next-line dot-notation
    const id = activatedRoute.params['id'];

    store.dispatch(fetchInstrument(id));

    return actions.pipe(
        ofType(fetchInstrumentFail, fetchInstrumentSuccess),
        filter(({ payload, type }) => {
            if (type === fetchInstrumentFail.type) {
                return payload === id;
            }

            // @todo TypeScript needs to be convinced that payload is of type TInstrument.
            return (<TInstrument>payload).id === id;
        }),
        first(), // eslint-disable-line rxjs/no-unsafe-first
        mergeMap(({ payload, type }) => {
            if (type === fetchInstrumentFail.type) {
                router.navigate(['/']);

                return EMPTY;
            }

            // @todo TypeScript needs to be convinced that payload is of type TInstrument.
            return of(<TInstrument>payload);
        })
    );
};
