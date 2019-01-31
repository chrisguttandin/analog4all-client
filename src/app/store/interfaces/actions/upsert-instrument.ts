import { Action } from '@ngrx/store';
import { TInstrument } from '../../types';

export interface IUpsertInstrumentAction extends Action {

    readonly payload: TInstrument;

    type: 'UPSERT_INSTRUMENT';

}
