import { Action } from '@ngrx/store';
import { IInstrument } from '../../../interfaces';

export interface IUpsertInstrumentAction extends Action {

    payload: IInstrument;

    type: 'UPSERT_INSTRUMENT';

}
