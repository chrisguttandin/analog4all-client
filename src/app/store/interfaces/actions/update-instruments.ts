import { Action } from '@ngrx/store';
import { IInstrument } from '../../../interfaces';

export interface IUpdateInstrumentsAction extends Action {

    payload: IInstrument[];

    type: 'UPDATE_INSTRUMENTS';

}
