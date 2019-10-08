import {
    IFetchInstrumentAction,
    IFetchInstrumentFailAction,
    IFetchInstrumentSuccessAction,
    IFetchInstrumentsAction,
    IFetchInstrumentsFailAction,
    IFetchInstrumentsSuccessAction,
    IUpdateInstrumentsAction,
    IUpsertInstrumentAction
} from '../interfaces';
import { TInstrument } from '../types';

export const FETCH_INSTRUMENT: IFetchInstrumentAction['type'] = 'FETCH_INSTRUMENT';
export const FETCH_INSTRUMENT_FAIL: IFetchInstrumentFailAction['type'] = 'FETCH_INSTRUMENT_FAIL';
export const FETCH_INSTRUMENT_SUCCESS: IFetchInstrumentSuccessAction['type'] = 'FETCH_INSTRUMENT_SUCCESS';
export const FETCH_INSTRUMENTS: IFetchInstrumentsAction['type'] = 'FETCH_INSTRUMENTS';
export const FETCH_INSTRUMENTS_FAIL: IFetchInstrumentsFailAction['type'] = 'FETCH_INSTRUMENTS_FAIL';
export const FETCH_INSTRUMENTS_SUCCESS: IFetchInstrumentsSuccessAction['type'] = 'FETCH_INSTRUMENTS_SUCCESS';
export const UPDATE_INSTRUMENTS: IUpdateInstrumentsAction['type'] = 'UPDATE_INSTRUMENTS';
export const UPSERT_INSTRUMENT: IUpsertInstrumentAction['type'] = 'UPSERT_INSTRUMENT';

export const fetchInstrument = (id: TInstrument['id']): IFetchInstrumentAction => ({
    payload: id,
    type: FETCH_INSTRUMENT
});

export const fetchInstrumentFail = (id: TInstrument['id']): IFetchInstrumentFailAction => ({
    payload: id,
    type: FETCH_INSTRUMENT_FAIL
});

export const fetchInstrumentSuccess = (instrument: TInstrument): IFetchInstrumentSuccessAction => ({
    payload: instrument,
    type: FETCH_INSTRUMENT_SUCCESS
});

export const fetchInstruments = (): IFetchInstrumentsAction => ({
    type: FETCH_INSTRUMENTS
});

export const fetchInstrumentsFail = (): IFetchInstrumentsFailAction => ({
    type: FETCH_INSTRUMENTS_FAIL
});

export const fetchInstrumentsSuccess = (instruments: readonly TInstrument[]): IFetchInstrumentsSuccessAction => ({
    payload: instruments,
    type: FETCH_INSTRUMENTS_SUCCESS
});

export const updateInstruments = (instruments: readonly TInstrument[]): IUpdateInstrumentsAction => ({
    payload: instruments,
    type: UPDATE_INSTRUMENTS
});

export const upsertInstrument = (instrument: TInstrument): IUpsertInstrumentAction => ({
    payload: instrument,
    type: UPSERT_INSTRUMENT
});
