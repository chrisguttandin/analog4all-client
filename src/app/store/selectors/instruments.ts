import { createSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TAppState, TInstrument } from '../types';

const findInstrumentById = (instruments: TAppState['instruments'], id: TInstrument['id']) => {
    return instruments.find((instrument) => instrument.id === id);
};

const instrumentByIdSelector = (instruments: TAppState['instruments'], id: TInstrument['id']) => {
    const instrument = findInstrumentById(instruments, id);

    if (instrument === undefined) {
        return null;
    }

    return instrument;
};

const instrumentsSelector = (state: TAppState) => state.instruments;

export const createInstrumentByIdSelector = (store: Observable<TAppState>, id: TInstrument['id']) =>
    store.pipe(select(createSelector(instrumentsSelector, instrumentByIdSelector), id));

export const createInstrumentsSelector = (store: Observable<TAppState>) => store.pipe(select(instrumentsSelector));
