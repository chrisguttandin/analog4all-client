import { IInstrument } from '../../interfaces';
import { UPDATE_INSTRUMENT, UPDATE_INSTRUMENTS } from '../actions';
import { TInstrumentAction } from '../types';

const updateInstrument = (instruments: IInstrument[], instrument: { id: string } & Partial<IInstrument>) => {
    const index = instruments.findIndex(({ id }) => id === instrument.id);

    if (index === -1) {
        throw new Error('An instrument with the same id is not stored.');
    }

    return [
        ...instruments.slice(0, index),
        { ...instruments[index], ...instrument },
        ...instruments.slice(index + 1)
    ];
};

const updateInstruments = (oldInstruments: IInstrument[], newInstruments: IInstrument[]) => {
    const remainingInstruments = oldInstruments
        .map((instrument) => [ instrument, newInstruments.find(({ id }) => instrument.id === id) ])
        .filter(([ , newInstrument ]) => (newInstrument !== undefined))
        // @todo TypeScript needs to be convinced that no value is undefined.
        .map(([ oldInstrument, newInstrument ]: [ IInstrument, IInstrument ]) => {
            if (oldInstrument.modified < newInstrument.modified) {
                return { ...oldInstrument, ...newInstrument };
            }

            return oldInstrument;
        });

    const additionalInstruments = newInstruments
        .filter(({ id }) => !(remainingInstruments.some(({ id: d }) => id === d)));

    return [ ...remainingInstruments, ...additionalInstruments ];
};

// @todo Defining this as a function was necessary to enable AoT with TypeScript 2.0.X.
export function instrumentsReducer (state: IInstrument[] = [ ], action: TInstrumentAction): IInstrument[] {
    switch (action.type) {
        case UPDATE_INSTRUMENT:
            return updateInstrument(state, action.payload);
        case UPDATE_INSTRUMENTS:
            return updateInstruments(state, action.payload);
        default:
            return state;
    }
}
