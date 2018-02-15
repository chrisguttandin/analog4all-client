import { IInstrument } from '.';

export interface IAppState {

    instruments: IInstrument[];

    isFetchingInstruments: boolean;

}
