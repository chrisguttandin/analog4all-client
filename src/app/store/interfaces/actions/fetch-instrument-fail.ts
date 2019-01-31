import { Action } from '@ngrx/store';
import { TInstrument } from '../../types';

export interface IFetchInstrumentFailAction extends Action {

    readonly payload: TInstrument['id'];

    type: 'FETCH_INSTRUMENT_FAIL';

}
