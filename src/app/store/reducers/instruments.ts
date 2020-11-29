import { createReducer, on } from '@ngrx/store';
import { updateInstruments, upsertInstrument } from '../actions';
import { TAppState, TInstrument, TStoreAction } from '../types';

export const INITIAL_STATE: TAppState['instruments'] = [];

const updateInstrumentsFunction = (oldInstruments: readonly TInstrument[], newInstruments: readonly TInstrument[]) => {
    const intersectingInstruments = oldInstruments
        .map((instrument) => [instrument, newInstruments.find(({ id }) => instrument.id === id)])
        .filter((oldAndNewInstrument): oldAndNewInstrument is [TInstrument, TInstrument] => {
            return oldAndNewInstrument[1] !== undefined;
        })
        .map(([oldInstrument, newInstrument]) => {
            if (oldInstrument.modified < newInstrument.modified) {
                return { ...oldInstrument, ...newInstrument };
            }

            return oldInstrument;
        });

    const additionalInstruments = newInstruments.filter(({ id }) => intersectingInstruments.every(({ id: d }) => id !== d));

    return [...intersectingInstruments, ...additionalInstruments];
};

const upsertInstrumentFunction = (instruments: readonly TInstrument[], instrument: TInstrument) => {
    const index = instruments.findIndex(({ id }) => id === instrument.id);

    if (index === -1) {
        return [...instruments, instrument];
    }

    return [...instruments.slice(0, index), instrument, ...instruments.slice(index + 1)];
};

const reducer = createReducer(
    INITIAL_STATE,
    on(updateInstruments, (state, { payload }) => updateInstrumentsFunction(state, payload)),
    on(upsertInstrument, (state, { payload }) => upsertInstrumentFunction(state, payload))
);

// @todo Defining this as a function was necessary to enable AoT with TypeScript 2.0.X.
export function instrumentsReducer(state = INITIAL_STATE, action: TStoreAction): TAppState['instruments'] {
    return reducer(state, action);
}
