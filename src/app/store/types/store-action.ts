import {
    IFetchInstrumentAction,
    IFetchInstrumentFailAction,
    IFetchInstrumentSuccessAction,
    IFetchInstrumentsAction,
    IFetchInstrumentsFailAction,
    IFetchInstrumentsSuccessAction,
    ISetIsFetchingInstrumentsAction,
    IUpdateInstrumentsAction,
    IUpsertInstrumentAction
} from '../interfaces';

export type TStoreAction =
    | IFetchInstrumentAction
    | IFetchInstrumentFailAction
    | IFetchInstrumentSuccessAction
    | IFetchInstrumentsAction
    | IFetchInstrumentsFailAction
    | IFetchInstrumentsSuccessAction
    | ISetIsFetchingInstrumentsAction
    | IUpdateInstrumentsAction
    | IUpsertInstrumentAction;
