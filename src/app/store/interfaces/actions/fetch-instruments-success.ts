import { Action } from '@ngrx/store';
import { TInstrument } from '../../types';

export interface IFetchInstrumentsSuccessAction extends Action {
    readonly payload: readonly TInstrument[];

    type: 'FETCH_INSTRUMENTS_SUCCESS';
}
