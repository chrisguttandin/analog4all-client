import { IInstrument } from '../../interfaces';
import { IUpdateInstrumentAction, IUpdateInstrumentsAction } from '../interfaces';
import { TInstrumentAction } from '../types';

export const UPDATE_INSTRUMENT: IUpdateInstrumentAction['type'] = 'UPDATE_INSTRUMENT';
export const UPDATE_INSTRUMENTS: IUpdateInstrumentsAction['type'] = 'UPDATE_INSTRUMENTS';

const updateInstrument = (instruments: IInstrument[], instrument: IInstrument) => {
    const index = instruments.findIndex(({ id }) => id === instrument.id);

    if (index === -1) {
        return instruments;
    }

    return [
        ...instruments.slice(0, index),
        { ...instruments[index], instrument },
        ...instruments.slice(index + 1)
    ];
};

// @todo Defining this as a function was necessary to enable AoT with TypeScript 2.0.X.
export function instrumentsReducer (state: IInstrument[] = [], action: TInstrumentAction): IInstrument[] {
    switch (action.type) {
        case UPDATE_INSTRUMENT:
            return updateInstrument(state, action.payload);
        case UPDATE_INSTRUMENTS:
            const remainingInstruments = state
                .map((instrument) => [ instrument, action.payload.find(({ id }) => instrument.id === id) ])
                .filter(([ , newInstrument ]) => (newInstrument !== undefined))
                // @todo TypeScript needs to be convinced that no value is undefined.
                .map(([ oldInstrument, newInstrument ]: [ IInstrument, IInstrument ]) => {
                    if (oldInstrument.modified !== newInstrument.modified) {
                        return { ...oldInstrument, ...newInstrument };
                    }

                    return oldInstrument;
                });

            const newInstruments = action.payload
                .filter(({ id }) => !(remainingInstruments.some(({ id: d }) => id === d)));

            return [ ...remainingInstruments, ...newInstruments ];
        default:
            return state;
    }
}
