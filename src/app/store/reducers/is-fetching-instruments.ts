import { createReducer, on } from '@ngrx/store';
import { setIsFetchingInstruments } from '../actions';
import { TAppState, TStoreAction } from '../types';

export const INITIAL_STATE = false;

const reducer = createReducer(
    INITIAL_STATE,
    on(setIsFetchingInstruments, (_, { payload }) => payload)
);

// @todo Defining this as a function was necessary to enable AoT with TypeScript 2.0.X.
export function isFetchingInstrumentsReducer(state = INITIAL_STATE, action: TStoreAction): TAppState['isFetchingInstruments'] {
    return reducer(state, action);
}
