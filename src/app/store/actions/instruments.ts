import { createAction } from '@ngrx/store';
import { TInstrument } from '../types';

export const fetchInstrument = createAction('FETCH_INSTRUMENT', (id: TInstrument['id']) => ({ payload: id }));

export const fetchInstrumentFail = createAction('FETCH_INSTRUMENT_FAIL', (id: TInstrument['id']) => ({ payload: id }));

export const fetchInstrumentSuccess = createAction('FETCH_INSTRUMENT_SUCCESS', (instrument: TInstrument) => ({ payload: instrument }));

export const fetchInstruments = createAction('FETCH_INSTRUMENTS');

export const fetchInstrumentsFail = createAction('FETCH_INSTRUMENTS_FAIL');

export const fetchInstrumentsSuccess = createAction('FETCH_INSTRUMENTS_SUCCESS', (instruments: readonly TInstrument[]) => ({
    payload: instruments
}));

export const updateInstruments = createAction('UPDATE_INSTRUMENTS', (instruments: readonly TInstrument[]) => ({ payload: instruments }));

export const upsertInstrument = createAction('UPSERT_INSTRUMENT', (instrument: TInstrument) => ({ payload: instrument }));
