import deepFreeze from 'deep-freeze-strict';
import { isFetchingInstrumentsReducer } from '../../../../src/app/store/reducers';

describe('isFetchingInstruments reducer', () => {
    describe('with an undefined state', () => {
        describe('with an empty action', () => {
            it('should return the default state', () => {
                const state = isFetchingInstrumentsReducer(undefined, <any>deepFreeze({}));

                expect(state).toEqual(false);
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

        describe('with an empty action', () => {
            it('should return the previous state', () => {
                const state = isFetchingInstrumentsReducer(previousState, <any>deepFreeze({}));

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
