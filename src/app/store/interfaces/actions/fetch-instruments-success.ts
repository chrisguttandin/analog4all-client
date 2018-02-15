import { Action } from '@ngrx/store';
import { IInstrument } from '..';

export interface IFetchInstrumentsSuccessAction extends Action {

    payload: IInstrument[];

    type: 'FETCH_INSTRUMENTS_SUCCESS';

}
