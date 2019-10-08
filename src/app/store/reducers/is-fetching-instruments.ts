import { createReducer, on } from '@ngrx/store';
import { setIsFetchingInstruments } from '../actions';
import { TStoreAction } from '../types';

const reducer = createReducer(
    false,
    on(setIsFetchingInstruments, (_, { payload }) => payload)
);

// @todo Defining this as a function was necessary to enable AoT with TypeScript 2.0.X.
export function isFetchingInstrumentsReducer (state = false, action: TStoreAction): boolean {
    return reducer(state, action);
}
