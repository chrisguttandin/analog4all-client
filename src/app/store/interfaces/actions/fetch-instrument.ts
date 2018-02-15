import { Action } from '@ngrx/store';
import { IInstrument } from '../../../interfaces';

export interface IFetchInstrumentAction extends Action {

    payload: IInstrument['id'];

    type: 'FETCH_INSTRUMENT';

}
