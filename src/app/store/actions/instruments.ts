import { IInstrument } from '../../interfaces';
import {
    IFetchInstrumentAction,
    IFetchInstrumentFailAction,
    IFetchInstrumentSuccessAction,
    IUpdateInstrumentsAction,
    IUpsertInstrumentAction
} from '../interfaces';

export const FETCH_INSTRUMENT: IFetchInstrumentAction['type'] = 'FETCH_INSTRUMENT';
export const FETCH_INSTRUMENT_FAIL: IFetchInstrumentFailAction['type'] = 'FETCH_INSTRUMENT_FAIL';
export const FETCH_INSTRUMENT_SUCCESS: IFetchInstrumentSuccessAction['type'] = 'FETCH_INSTRUMENT_SUCCESS';
export const UPDATE_INSTRUMENTS: IUpdateInstrumentsAction['type'] = 'UPDATE_INSTRUMENTS';
export const UPSERT_INSTRUMENT: IUpsertInstrumentAction['type'] = 'UPSERT_INSTRUMENT';

export const fetchInstrument = (id: IInstrument['id']): IFetchInstrumentAction => ({
    payload: id,
    type: FETCH_INSTRUMENT
});

export const fetchInstrumentFail = (id: IInstrument['id']): IFetchInstrumentFailAction => ({
    payload: id,
    type: FETCH_INSTRUMENT_FAIL
});

export const fetchInstrumentSuccess = (instrument: IInstrument): IFetchInstrumentSuccessAction => ({
    payload: instrument,
    type: FETCH_INSTRUMENT_SUCCESS
});

export const updateInstruments = (instruments: IInstrument[]): IUpdateInstrumentsAction => ({
    payload: instruments,
    type: UPDATE_INSTRUMENTS
});

export const upsertInstrument = (instrument: IInstrument): IUpsertInstrumentAction => ({
    payload: instrument,
    type: UPSERT_INSTRUMENT
});
