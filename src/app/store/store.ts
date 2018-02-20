import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './interfaces';
import { instrumentsReducer, isFetchingInstrumentsReducer } from './reducers';
import { TStoreAction } from './types';

export const appReducer: ActionReducerMap<IAppState, TStoreAction> = {
    instruments: instrumentsReducer,
    isFetchingInstruments: isFetchingInstrumentsReducer
};
