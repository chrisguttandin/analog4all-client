import { Action } from '@ngrx/store';
import { IInstrument } from '../instrument';

export interface IUpdateInstrumentsAction extends Action {

    payload: IInstrument[];

    type: 'UPDATE_INSTRUMENTS';

}
