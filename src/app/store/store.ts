import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './interfaces';
import { instrumentsReducer } from './reducers';

export const appReducer: ActionReducerMap<IAppState> = {
    instruments: instrumentsReducer
};
