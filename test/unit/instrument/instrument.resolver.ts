import { BehaviorSubject, Observable } from 'rxjs';
import { InstrumentResolver } from '../../../src/app/instrument/instrument.resolver';

describe('InstrumentResolver', () => {

    let instrumentResolver;

    let instrumentsService;

    let router;

    beforeEach(() => {
        instrumentsService = {
            get () {} // tslint:disable-line:no-empty
        };

        router = {
            navigate () {} // tslint:disable-line:no-empty
        };

        spyOn(router, 'navigate').and.callThrough();

        instrumentResolver = new InstrumentResolver(<any> instrumentsService, <any> router);
    });

    describe('resolve()', () => {

        let activatedRouteSnapshot;

        beforeEach(() => {
            activatedRouteSnapshot = {
                params: {
                    id: 'a fake id'
                }
            };
        });

        describe('with an existing instument', () => {

            beforeEach(() => {
                spyOn(instrumentsService, 'get').and.returnValue(Observable.of('a fake instrument'));
            });

            it('should get the instrument with the id given by the params', () => {
                instrumentResolver.resolve(activatedRouteSnapshot);

                expect(instrumentsService.get).toHaveBeenCalledWith(activatedRouteSnapshot.params.id);
            });

            it('should return an observable of the instument', (done) => {
                const next = jasmine.createSpy('next');

                instrumentResolver
                    .resolve(activatedRouteSnapshot)
                    .subscribe({
                        complete () {
                            expect(next).toHaveBeenCalledWith('a fake instrument');

                            done();
                        },
                        error (err) {
                            throw err;
                        },
                        next
                    });
            });

        });

        describe('without an existing instument', () => {

            beforeEach(() => {
                spyOn(instrumentsService, 'get').and.returnValue(Observable.throw('a fake error'));
            });

            it('should get the instrument with the id given by the params', () => {
                instrumentResolver.resolve(activatedRouteSnapshot);

                expect(instrumentsService.get).toHaveBeenCalledWith(activatedRouteSnapshot.params.id);
            });

            it('should navigate to the / URL', () => {
                instrumentResolver
                    .resolve(activatedRouteSnapshot)
                    .subscribe();

                expect(router.navigate).toHaveBeenCalledWith([ '/' ]);
            });

            it('should return an empty observable', (done) => {
                const next = jasmine.createSpy('next');

                instrumentResolver
                    .resolve(activatedRouteSnapshot)
                    .subscribe({
                        complete () {
                            expect(next).not.toHaveBeenCalled();

                            done();
                        },
                        error (err) {
                            throw err;
                        },
                        next
                    });
            });

        });

    });

});
