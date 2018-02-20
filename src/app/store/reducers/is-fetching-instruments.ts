import { SET_IS_FETCHING_INSTRUMENTS } from '../actions';
import { TStoreAction } from '../types';

// @todo Defining this as a function was necessary to enable AoT with TypeScript 2.0.X.
export function isFetchingInstrumentsReducer (state = false, action: TStoreAction): boolean {
    switch (action.type) {
        case SET_IS_FETCHING_INSTRUMENTS:
            return action.payload;
        default:
            return state;
    }
}
