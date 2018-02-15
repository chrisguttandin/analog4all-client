import { ISetIsFetchingInstrumentsAction } from '../interfaces';

export const SET_IS_FETCHING_INSTRUMENTS: ISetIsFetchingInstrumentsAction['type'] = 'SET_IS_FETCHING_INSTRUMENTS';

export const setIsFetchingInstruments = (isFetchingInstruments: boolean): ISetIsFetchingInstrumentsAction => ({
    payload: isFetchingInstruments,
    type: SET_IS_FETCHING_INSTRUMENTS
});
