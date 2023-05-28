import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, filter, first, mergeMap, of } from 'rxjs';
import { TAppState, TInstrument, fetchInstrument, fetchInstrumentFail, fetchInstrumentSuccess } from '../store';

const redirect = (router: Router): Observable<never> => {
    router.navigate(['/']);

    return EMPTY;
};

export const resolveInstrument = (activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<TInstrument> => {
    const actions = inject(Actions);
    const router = inject(Router);
    const store = inject(Store<TAppState>);
    const id = activatedRouteSnapshot.paramMap.get('id');

    if (id === null) {
        return redirect(router);
    }

    store.dispatch(fetchInstrument(id));

    return actions.pipe(
        ofType(fetchInstrumentFail, fetchInstrumentSuccess),
        filter(({ payload, type }) => {
            if (type === fetchInstrumentFail.type) {
                return payload === id;
            }

            return payload.id === id;
        }),
        first(), // eslint-disable-line rxjs/no-unsafe-first
        mergeMap(({ payload, type }) => {
            if (type === fetchInstrumentFail.type) {
                return redirect(router);
            }

            return of(payload);
        })
    );
};
