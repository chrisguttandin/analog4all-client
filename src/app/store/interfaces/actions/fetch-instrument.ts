import { Action } from '@ngrx/store';
import { IInstrument } from '../instrument';

export interface IFetchInstrumentAction extends Action {

    payload: IInstrument['id'];

    type: 'FETCH_INSTRUMENT';

}
