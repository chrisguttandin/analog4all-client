import { ISetIsFetchingInstrumentsAction, IUpdateInstrumentsAction, IUpsertInstrumentAction } from '../interfaces';

export type TStoreAction = ISetIsFetchingInstrumentsAction | IUpdateInstrumentsAction | IUpsertInstrumentAction;
