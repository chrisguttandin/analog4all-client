import { Action } from '@ngrx/store';
import { IInstrument } from '..';

export interface IUpsertInstrumentAction extends Action {

    payload: IInstrument;

    type: 'UPSERT_INSTRUMENT';

}
