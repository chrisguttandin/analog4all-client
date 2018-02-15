import { IInstrument } from '../../interfaces';

export interface IAppState {

    instruments: IInstrument[];

    isFetchingInstruments: boolean;

}
