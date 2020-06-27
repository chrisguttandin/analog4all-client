import deepFreeze from 'deep-freeze-strict';
import { INITIAL_STATE, isFetchingInstrumentsReducer } from '../../../../src/app/store/reducers/is-fetching-instruments';
import { TStoreAction } from '../../../../src/app/store/types';

describe('isFetchingInstruments reducer', () => {
    describe('with an undefined state', () => {
        describe('with an unknown action', () => {
            it('should return the initial state', () => {
                const state = isFetchingInstrumentsReducer(undefined, deepFreeze(<TStoreAction>{}));

                expect(state).toEqual(INITIAL_STATE);
            });
        });

        describe('with an action of type SET_IS_FETCHING_INSTRUMENTS', () => {
            it('should return the given value', () => {
                const isFetchingInstruments = true;
                const state = isFetchingInstrumentsReducer(
                    undefined,
                    deepFreeze({
                        payload: isFetchingInstruments,
                        type: 'SET_IS_FETCHING_INSTRUMENTS'
                    })
                );

                expect(state).toEqual(isFetchingInstruments);
            });
        });
    });

    describe('with a string as state', () => {
        let previousState: boolean;

        beforeEach(() => {
            previousState = deepFreeze(true);
        });

        describe('with an unknown action', () => {
            it('should return the previous state', () => {
                const state = isFetchingInstrumentsReducer(previousState, deepFreeze(<TStoreAction>{}));

                expect(state).toEqual(previousState);
            });
        });

        describe('with an action of type SET_IS_FETCHING_INSTRUMENTS', () => {
            it('should return the given value', () => {
                const isFetchingInstruments = false;
                const state = isFetchingInstrumentsReducer(
                    previousState,
                    deepFreeze({
                        payload: isFetchingInstruments,
                        type: 'SET_IS_FETCHING_INSTRUMENTS'
                    })
                );

                expect(state).toEqual(isFetchingInstruments);
            });
        });
    });
});
