import { TInstrument } from './instrument';

export type TAppState = Readonly<{
    instruments: readonly TInstrument[];

    isFetchingInstruments: boolean;
}>;
