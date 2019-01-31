import { Action } from '@ngrx/store';
import { TInstrument } from '../../types';

export interface IFetchInstrumentSuccessAction extends Action {

    readonly payload: TInstrument;

    type: 'FETCH_INSTRUMENT_SUCCESS';

}
