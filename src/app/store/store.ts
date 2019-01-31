import { ActionReducerMap } from '@ngrx/store';
import { instrumentsReducer, isFetchingInstrumentsReducer } from './reducers';
import { TAppState, TStoreAction } from './types';

export const appReducer: ActionReducerMap<TAppState, TStoreAction> = {
    instruments: instrumentsReducer,
    isFetchingInstruments: isFetchingInstrumentsReducer
};
