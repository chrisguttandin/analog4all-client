import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './interfaces';
import { instrumentsReducer, isFetchingInstrumentsReducer } from './reducers';

export const appReducer: ActionReducerMap<IAppState> = {
    instruments: instrumentsReducer,
    isFetchingInstruments: isFetchingInstrumentsReducer
};
