import { createAction } from '@ngrx/store';
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

export const fetchInstrument = createAction(FETCH_INSTRUMENT, (id: TInstrument['id']) => ({ payload: id }));

export const fetchInstrumentFail = createAction(FETCH_INSTRUMENT_FAIL, (id: TInstrument['id']) => ({ payload: id }));

export const fetchInstrumentSuccess = createAction(FETCH_INSTRUMENT_SUCCESS, (instrument: TInstrument) => ({ payload: instrument }));

export const fetchInstruments = createAction(FETCH_INSTRUMENTS);

export const fetchInstrumentsFail = createAction(FETCH_INSTRUMENTS_FAIL);

export const fetchInstrumentsSuccess = createAction(FETCH_INSTRUMENTS_SUCCESS, (instruments: readonly TInstrument[]) => ({
    payload: instruments
}));

export const updateInstruments = createAction(UPDATE_INSTRUMENTS, (instruments: readonly TInstrument[]) => ({ payload: instruments }));

export const upsertInstrument = createAction(UPSERT_INSTRUMENT, (instrument: TInstrument) => ({ payload: instrument }));
