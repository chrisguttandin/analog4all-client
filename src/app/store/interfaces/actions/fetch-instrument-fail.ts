import { Action } from '@ngrx/store';
import { IInstrument } from '..';

export interface IFetchInstrumentFailAction extends Action {

    payload: IInstrument['id'];

    type: 'FETCH_INSTRUMENT_FAIL';

}
