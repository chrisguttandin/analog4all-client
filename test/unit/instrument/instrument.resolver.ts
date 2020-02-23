import { Subject } from 'rxjs';
import { InstrumentResolver } from '../../../src/app/instrument/instrument.resolver';

describe('InstrumentResolver', () => {

    let actions: any;
    let instrumentResolver: InstrumentResolver;
    let router: any;
    let store: any;

    beforeEach(() => {
        actions = new Subject();
        router = {
            navigate (): void { } // tslint:disable-line:no-empty
        };
        store = {
            dispatch (): void { } // tslint:disable-line:no-empty
        };

        spyOn(router, 'navigate');
        spyOn(store, 'dispatch');

        instrumentResolver = new InstrumentResolver(actions, router, store);
    });

    describe('resolve()', () => {

        let activatedRouteSnapshot: any;

        beforeEach(() => {
            activatedRouteSnapshot = {
                params: {
                    id: 'a fake id'
                }
            };
        });

        it('should dispatch an action of type FETCH_INSTRUMENT with the id given by the params', () => {
            instrumentResolver.resolve(activatedRouteSnapshot); // tslint:disable-line:rxjs-no-ignored-observable

            expect(store.dispatch).toHaveBeenCalledWith({ payload: activatedRouteSnapshot.params.id, type: 'FETCH_INSTRUMENT' });
        });

        describe('with an existing instument', () => {

            let instrument: any;

            beforeEach(() => {
                instrument = { id: activatedRouteSnapshot.params.id };
            });

            it('should return an observable of the instument', (done) => {
                const next = jasmine.createSpy('next');

                instrumentResolver
                    .resolve(activatedRouteSnapshot)
                    .subscribe({
                        complete (): void {
                            expect(next).toHaveBeenCalledWith(instrument);

                            done();
                        },
                        error (err): void {
                            throw err;
                        },
                        next
                    });

                actions.next(({ payload: instrument, type: 'FETCH_INSTRUMENT_SUCCESS' }));
            });

        });

        describe('without an existing instument', () => {

            it('should navigate to the / URL', () => {
                instrumentResolver
                    .resolve(activatedRouteSnapshot)
                    .subscribe();

                actions.next(({ payload: activatedRouteSnapshot.params.id, type: 'FETCH_INSTRUMENT_FAIL' }));

                expect(router.navigate).toHaveBeenCalledWith([ '/' ]);
            });

            it('should return an empty observable', (done) => {
                const next = jasmine.createSpy('next');

                instrumentResolver
                    .resolve(activatedRouteSnapshot)
                    .subscribe({
                        complete (): void {
                            expect(next).not.toHaveBeenCalled();

                            done();
                        },
                        error (err): void {
                            throw err;
                        },
                        next
                    });

                actions.next(({ payload: activatedRouteSnapshot.params.id, type: 'FETCH_INSTRUMENT_FAIL' }));
            });

        });

    });

});
