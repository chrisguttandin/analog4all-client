import { IInstrument } from '../../interfaces';
import { UPDATE_INSTRUMENTS, UPSERT_INSTRUMENT } from '../actions';
import { TInstrumentAction } from '../types';

const updateInstruments = (oldInstruments: IInstrument[], newInstruments: IInstrument[]) => {
    const remainingInstruments = oldInstruments
        .map((instrument) => [ instrument, newInstruments.find(({ id }) => instrument.id === id) ])
        .filter<[ IInstrument, IInstrument ]>((oldAndNewInstrument): oldAndNewInstrument is [ IInstrument, IInstrument ] => {
            return (oldAndNewInstrument[1] !== undefined);
        })
        .map(([ oldInstrument, newInstrument ]) => {
            if (oldInstrument.modified < newInstrument.modified) {
                return { ...oldInstrument, ...newInstrument };
            }

            return oldInstrument;
        });

    const additionalInstruments = newInstruments
        .filter(({ id }) => !(remainingInstruments.some(({ id: d }) => id === d)));

    return [ ...remainingInstruments, ...additionalInstruments ];
};

const upsertInstrument = (instruments: IInstrument[], instrument: IInstrument) => {
    const index = instruments.findIndex(({ id }) => id === instrument.id);

    if (index === -1) {
        return [ ...instruments, instrument ];
    }

    return [
        ...instruments.slice(0, index),
        { ...instruments[index], ...instrument },
        ...instruments.slice(index + 1)
    ];
};

// @todo Defining this as a function was necessary to enable AoT with TypeScript 2.0.X.
export function instrumentsReducer (state: IInstrument[] = [ ], action: TInstrumentAction): IInstrument[] {
    switch (action.type) {
        case UPDATE_INSTRUMENTS:
            return updateInstruments(state, action.payload);
        case UPSERT_INSTRUMENT:
            return upsertInstrument(state, action.payload);
        default:
            return state;
    }
}
