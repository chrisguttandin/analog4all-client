import { IInstrument } from '../../interfaces';
import { IUpdateInstrumentAction, IUpdateInstrumentsAction } from '../interfaces';

export const UPDATE_INSTRUMENT: IUpdateInstrumentAction['type'] = 'UPDATE_INSTRUMENT';
export const UPDATE_INSTRUMENTS: IUpdateInstrumentsAction['type'] = 'UPDATE_INSTRUMENTS';

export const updateInstrument = (instrument: { id: string } & Partial<IInstrument>): IUpdateInstrumentAction => ({
    payload: instrument,
    type: UPDATE_INSTRUMENT
});

export const updateInstruments = (instruments: IInstrument[]): IUpdateInstrumentsAction => ({
    payload: instruments,
    type: UPDATE_INSTRUMENTS
});
