import deepFreeze from 'deep-freeze-strict';
import { instrumentsReducer } from '../../../../src/app/store/reducers';
import { TInstrument, TStoreAction } from '../../../../src/app/store/types';

describe('instruments reducer', () => {
    describe('with an undefined state', () => {
        describe('with an empty action', () => {
            it('should return the default state', () => {
                const state = instrumentsReducer(undefined, deepFreeze(<TStoreAction>{}));

                expect(state).toEqual([]);
            });
        });

        describe('with an action of type FETCH_INSTRUMENT', () => {
            it('should return the default state', () => {
                const id = 'a fake id';
                const state = instrumentsReducer(undefined, deepFreeze({ payload: id, type: 'FETCH_INSTRUMENT' }));

                expect(state).toEqual([]);
            });
        });

        describe('with an action of type FETCH_INSTRUMENT_FAIL', () => {
            it('should return the default state', () => {
                const id = 'a fake id';
                const state = instrumentsReducer(undefined, deepFreeze({ payload: id, type: 'FETCH_INSTRUMENT_FAIL' }));

                expect(state).toEqual([]);
            });
        });

        describe('with an action of type FETCH_INSTRUMENT_SUCCESS', () => {
            it('should return the default state', () => {
                const instrument = {
                    created: 1518284684850,
                    id: 'a fake id',
                    isAvailable: false,
                    modified: 1518284684850,
                    name: 'a fake name'
                };
                const state = instrumentsReducer(undefined, deepFreeze({ payload: instrument, type: 'FETCH_INSTRUMENT_SUCCESS' }));

                expect(state).toEqual([]);
            });
        });

        describe('with an action of type FETCH_INSTRUMENTS', () => {
            it('should return the default state', () => {
                const state = instrumentsReducer(undefined, deepFreeze({ type: 'FETCH_INSTRUMENTS' }));

                expect(state).toEqual([]);
            });
        });

        describe('with an action of type FETCH_INSTRUMENTS_FAIL', () => {
            it('should return the default state', () => {
                const state = instrumentsReducer(undefined, deepFreeze({ type: 'FETCH_INSTRUMENTS_FAIL' }));

                expect(state).toEqual([]);
            });
        });

        describe('with an action of type FETCH_INSTRUMENTS_SUCCESS', () => {
            it('should return the default state', () => {
                const instruments = [
                    {
                        created: 1518284684850,
                        id: 'a fake id',
                        isAvailable: false,
                        modified: 1518284684850,
                        name: 'a fake name'
                    }
                ];
                const state = instrumentsReducer(undefined, deepFreeze({ payload: instruments, type: 'FETCH_INSTRUMENTS_SUCCESS' }));

                expect(state).toEqual([]);
            });
        });

        describe('with an action of type UPSERT_INSTRUMENT', () => {
            it('should return an updated array of instruments', () => {
                const instrument = {
                    created: 1518284684850,
                    id: 'a fake id',
                    isAvailable: false,
                    modified: 1518284684850,
                    name: 'a fake name'
                };
                const state = instrumentsReducer(undefined, deepFreeze({ payload: instrument, type: 'UPSERT_INSTRUMENT' }));

                expect(state).toEqual([instrument]);
            });
        });

        describe('with an action of type UPDATE_INSTRUMENTS', () => {
            it('should return the given instruments', () => {
                const instruments = [
                    {
                        created: 1518284684850,
                        id: 'a fake id',
                        isAvailable: false,
                        modified: 1518284684850,
                        name: 'a fake name'
                    }
                ];
                const state = instrumentsReducer(undefined, deepFreeze({ payload: instruments, type: 'UPDATE_INSTRUMENTS' }));

                expect(state).toEqual(instruments);
            });
        });
    });

    describe('with an array of instruments as state', () => {
        let previousState: TInstrument[];

        beforeEach(() => {
            previousState = deepFreeze([
                {
                    created: 1518284684850,
                    id: 'a fake id',
                    isAvailable: false,
                    modified: 1518284684850,
                    name: 'a fake name'
                }
            ]);
        });

        describe('with an empty action', () => {
            it('should return the previous state', () => {
                const state = instrumentsReducer(previousState, deepFreeze(<TStoreAction>{}));

                expect(state).toEqual(previousState);
            });
        });

        describe('with an action of type FETCH_INSTRUMENT', () => {
            it('should return the previous state', () => {
                const id = 'a fake id';
                const state = instrumentsReducer(previousState, deepFreeze({ payload: id, type: 'FETCH_INSTRUMENT' }));

                expect(state).toEqual(previousState);
            });
        });

        describe('with an action of type FETCH_INSTRUMENT_FAIL', () => {
            it('should return the previous state', () => {
                const id = 'a fake id';
                const state = instrumentsReducer(previousState, deepFreeze({ payload: id, type: 'FETCH_INSTRUMENT_FAIL' }));

                expect(state).toEqual(previousState);
            });
        });

        describe('with an action of type FETCH_INSTRUMENT_SUCCESS', () => {
            it('should return the previous state', () => {
                const instrument = {
                    created: 1518284684850,
                    id: 'a fake id',
                    isAvailable: false,
                    modified: 1518284684850,
                    name: 'a fake name'
                };
                const state = instrumentsReducer(
                    previousState,
                    deepFreeze({
                        payload: instrument,
                        type: 'FETCH_INSTRUMENT_SUCCESS'
                    })
                );

                expect(state).toEqual(previousState);
            });
        });

        describe('with an action of type FETCH_INSTRUMENTS', () => {
            it('should return the previous state', () => {
                const state = instrumentsReducer(previousState, deepFreeze({ type: 'FETCH_INSTRUMENTS' }));

                expect(state).toEqual(previousState);
            });
        });

        describe('with an action of type FETCH_INSTRUMENTS_FAIL', () => {
            it('should return the previous state', () => {
                const state = instrumentsReducer(
                    previousState,
                    deepFreeze({
                        type: 'FETCH_INSTRUMENTS_FAIL'
                    })
                );

                expect(state).toEqual(previousState);
            });
        });

        describe('with an action of type FETCH_INSTRUMENTS_SUCCESS', () => {
            it('should return the previous state', () => {
                const instruments = [
                    {
                        created: 1518284684850,
                        id: 'a fake id',
                        isAvailable: false,
                        modified: 1518284684850,
                        name: 'a fake name'
                    }
                ];
                const state = instrumentsReducer(
                    previousState,
                    deepFreeze({
                        payload: instruments,
                        type: 'FETCH_INSTRUMENTS_SUCCESS'
                    })
                );

                expect(state).toEqual(previousState);
            });
        });

        describe('with an action of type UPSERT_INSTRUMENT', () => {
            it('should return an updated array of instruments', () => {
                const instrument = {
                    created: 1518284684850,
                    id: 'a fake id',
                    isAvailable: false,
                    modified: 1518284684850,
                    name: 'another fake name'
                };
                const state = instrumentsReducer(previousState, deepFreeze({ payload: instrument, type: 'UPSERT_INSTRUMENT' }));

                expect(state).toEqual([{ ...previousState[0], ...instrument }]);
            });
        });

        describe('with an action of type UPDATE_INSTRUMENTS', () => {
            it('should return an updated array of instruments', () => {
                const instruments = [
                    {
                        created: 1518284684850,
                        id: 'a fake id',
                        isAvailable: true,
                        modified: 1518284684851,
                        name: 'another fake name'
                    }
                ];
                const state = instrumentsReducer(previousState, deepFreeze({ payload: instruments, type: 'UPDATE_INSTRUMENTS' }));

                expect(state).toEqual([{ ...previousState[0], ...instruments[0] }]);
            });
        });
    });
});
