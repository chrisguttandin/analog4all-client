import { TInstrument } from './instrument';

export type TAppState = Readonly<{

    instruments: TInstrument[];

    isFetchingInstruments: boolean;

}>;
