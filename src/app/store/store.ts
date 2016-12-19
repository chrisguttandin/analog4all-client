import { ActionReducer } from '@ngrx/store';
import { IInstrument } from '../interfaces';
import { instrumentsReducer } from './reducers/instruments';

export interface IAppState {
    instruments: IInstrument[];
};

const appReducer: { [key: string]: ActionReducer<any> } = {
    instruments: instrumentsReducer
};

// @todo This separate export was necessary to enable AoT with TypeScript 2.0.X.
export { appReducer };
