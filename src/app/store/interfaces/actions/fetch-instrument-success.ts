import { Action } from '@ngrx/store';
import { IInstrument } from '../../../interfaces';

export interface IFetchInstrumentSuccessAction extends Action {

    payload: IInstrument;

    type: 'FETCH_INSTRUMENT_SUCCESS';

}
