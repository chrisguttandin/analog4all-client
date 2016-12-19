import { Action, ActionReducer } from '@ngrx/store';
import { IInstrument } from '../../interfaces';

export const UPDATE_INSTRUMENT = 'UPDATE_INSTRUMENT';
export const UPDATE_INSTRUMENTS = 'UPDATE_INSTRUMENTS';

const updateInstrument = (instruments, instrument) => {
    const index = instruments.findIndex(({ id }) => id === instrument);

    if (index === -1) {
        return instruments;
    }

    return [
        ...instruments.slice(0, index),
        Object.assign({}, instruments[index], instrument),
        ...instruments.slice(index + 1)
    ];
};

const instrumentsReducer: ActionReducer<IInstrument[]> = (state = [], action: Action) => {
    switch (action.type) {
        case UPDATE_INSTRUMENT:
            return updateInstrument(state, action.payload);
        case UPDATE_INSTRUMENTS:
            const remainingInstruments = state
                .map((instrument) => [ instrument, action.payload.find(({ id }) => instrument.id === id) ])
                .filter(([ , newInstrument ]) => (newInstrument !== undefined))
                .map(([ oldInstrument, newInstrument ]) => {
                    if (oldInstrument.modified !== newInstrument.modified) {
                        return Object.assign(oldInstrument, newInstrument);
                    }

                    return oldInstrument;
                });

            const newInstruments = action.payload
                .filter(({ id }) => !(remainingInstruments.some(({ id: d }) => id === d)));

            return [ ...remainingInstruments, ...newInstruments ];
        default:
            return state;
    }
};

// @todo This separate export was necessary to enable AoT with TypeScript 2.0.X.
export { instrumentsReducer };
