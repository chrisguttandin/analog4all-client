import { ActionReducer } from '@ngrx/store';
import { IInstrument } from '../interfaces';
import { instrumentsReducer } from './reducers/instruments';

export interface IAppState {
    instruments: IInstrument[];
}

export const appReducer: { [key: string]: ActionReducer<any> } = {
    instruments: instrumentsReducer
};
