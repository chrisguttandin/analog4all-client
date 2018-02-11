import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './interfaces';
import { instrumentsReducer } from './reducers/instruments';

export const appReducer: ActionReducerMap<IAppState> = {
    instruments: instrumentsReducer
};
