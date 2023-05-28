import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { resolveInstrument } from '../../../src/app/instrument/instrument.resolver';

describe('resolveInstrument', () => {
    let actions: any;
    let router: any;
    let store: any;

    beforeEach(() => {
        actions = new Subject();
        router = {
            navigate(): void {} // eslint-disable-line @typescript-eslint/no-empty-function, no-empty-function
        };
        store = {
            dispatch(): void {} // eslint-disable-line @typescript-eslint/no-empty-function, no-empty-function
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: Actions, useValue: actions },
                { provide: Router, useValue: router },
                { provide: Store, useValue: store }
            ]
        });

        spyOn(router, 'navigate');
        spyOn(store, 'dispatch');
    });

    describe('resolve()', () => {
        let activatedRouteSnapshot: any;

        beforeEach(() => {
            activatedRouteSnapshot = {
                paramMap: new Map([['id', 'a fake id']])
            };
        });

        it('should dispatch an action of type FETCH_INSTRUMENT with the id given by the paramMap', () => {
            TestBed.runInInjectionContext(() => {
                resolveInstrument(activatedRouteSnapshot); // eslint-disable-line rxjs/no-ignored-observable

                expect(store.dispatch).toHaveBeenCalledWith({
                    payload: activatedRouteSnapshot.paramMap.get('id'),
                    type: 'FETCH_INSTRUMENT'
                });
            });
        });

        describe('with an existing instument', () => {
            let instrument: any;

            beforeEach(() => {
                instrument = { id: activatedRouteSnapshot.paramMap.get('id') };
            });

            it('should return an observable of the instument', (done) => {
                const next = jasmine.createSpy('next');

                TestBed.runInInjectionContext(() => {
                    resolveInstrument(activatedRouteSnapshot).subscribe({
                        complete(): void {
                            expect(next).toHaveBeenCalledWith(instrument);

                            done();
                        },
                        error(err): void {
                            throw err;
                        },
                        next
                    });

                    actions.next({ payload: instrument, type: 'FETCH_INSTRUMENT_SUCCESS' });
                });
            });
        });

        describe('without an existing instument', () => {
            it('should navigate to the / URL', () => {
                TestBed.runInInjectionContext(() => {
                    resolveInstrument(activatedRouteSnapshot).subscribe();

                    actions.next({ payload: activatedRouteSnapshot.paramMap.get('id'), type: 'FETCH_INSTRUMENT_FAIL' });

                    expect(router.navigate).toHaveBeenCalledWith(['/']);
                });
            });

            it('should return an empty observable', (done) => {
                const next = jasmine.createSpy('next');

                TestBed.runInInjectionContext(() => {
                    resolveInstrument(activatedRouteSnapshot).subscribe({
                        complete(): void {
                            expect(next).not.toHaveBeenCalled();

                            done();
                        },
                        error(err): void {
                            throw err;
                        },
                        next
                    });

                    actions.next({ payload: activatedRouteSnapshot.paramMap.get('id'), type: 'FETCH_INSTRUMENT_FAIL' });
                });
            });
        });
    });
});
