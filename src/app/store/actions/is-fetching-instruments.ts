import { createAction } from '@ngrx/store';

export const setIsFetchingInstruments = createAction('SET_IS_FETCHING_INSTRUMENTS', (isFetchingInstruments: boolean) => ({
    payload: isFetchingInstruments
}));
