import { setIsFetchingInstruments } from '../actions';
import { TStoreAction } from '../types';

// @todo Defining this as a function was necessary to enable AoT with TypeScript 2.0.X.
export function isFetchingInstrumentsReducer (state = false, action: TStoreAction): boolean {
    switch (action.type) {
        case setIsFetchingInstruments.type:
            return action.payload;
        default:
            return state;
    }
}
