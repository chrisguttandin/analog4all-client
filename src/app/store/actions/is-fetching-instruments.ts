import { createAction } from '@ngrx/store';
import { ISetIsFetchingInstrumentsAction } from '../interfaces';

export const SET_IS_FETCHING_INSTRUMENTS: ISetIsFetchingInstrumentsAction['type'] = 'SET_IS_FETCHING_INSTRUMENTS';

export const setIsFetchingInstruments = createAction(SET_IS_FETCHING_INSTRUMENTS, (isFetchingInstruments: boolean) => ({
    payload: isFetchingInstruments
}));
