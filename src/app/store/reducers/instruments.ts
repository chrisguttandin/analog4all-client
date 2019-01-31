import { UPDATE_INSTRUMENTS, UPSERT_INSTRUMENT } from '../actions';
import { TInstrument, TStoreAction } from '../types';

const updateInstruments = (oldInstruments: TInstrument[], newInstruments: TInstrument[]) => {
    const intersectingInstruments = oldInstruments
        .map((instrument) => [ instrument, newInstruments.find(({ id }) => instrument.id === id) ])
        .filter((oldAndNewInstrument): oldAndNewInstrument is [ TInstrument, TInstrument ] => {
            return (oldAndNewInstrument[1] !== undefined);
        })
        .map(([ oldInstrument, newInstrument ]) => {
            if (oldInstrument.modified < newInstrument.modified) {
                return { ...oldInstrument, ...newInstrument };
            }

            return oldInstrument;
        });

    const additionalInstruments = newInstruments
        .filter(({ id }) => intersectingInstruments.every(({ id: d }) => id !== d));

    return [ ...intersectingInstruments, ...additionalInstruments ];
};

const upsertInstrument = (instruments: TInstrument[], instrument: TInstrument) => {
    const index = instruments.findIndex(({ id }) => id === instrument.id);

    if (index === -1) {
        return [ ...instruments, instrument ];
    }

    return [
        ...instruments.slice(0, index),
        instrument,
        ...instruments.slice(index + 1)
    ];
};

// @todo Defining this as a function was necessary to enable AoT with TypeScript 2.0.X.
export function instrumentsReducer (state: TInstrument[] = [ ], action: TStoreAction): TInstrument[] {
    switch (action.type) {
        case UPDATE_INSTRUMENTS:
            return updateInstruments(state, action.payload);
        case UPSERT_INSTRUMENT:
            return upsertInstrument(state, action.payload);
        default:
            return state;
    }
}
