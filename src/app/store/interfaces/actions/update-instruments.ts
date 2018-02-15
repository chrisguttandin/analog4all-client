import { Action } from '@ngrx/store';
import { IInstrument } from '..';

export interface IUpdateInstrumentsAction extends Action {

    payload: IInstrument[];

    type: 'UPDATE_INSTRUMENTS';

}
