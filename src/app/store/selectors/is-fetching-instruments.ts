import { IAppState } from '../interfaces';

export const selectIsFetchingInstruments = (state: IAppState) => state.isFetchingInstruments;
