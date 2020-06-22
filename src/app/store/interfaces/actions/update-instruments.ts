import { Action } from '@ngrx/store';
import { TInstrument } from '../../types';

export interface IUpdateInstrumentsAction extends Action {
    readonly payload: readonly TInstrument[];

    type: 'UPDATE_INSTRUMENTS';
}
