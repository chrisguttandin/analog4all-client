import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { createIsFetchingInstrumentsSelector } from '../../../../src/app/store/selectors';
import { TAppState } from '../../../../src/app/store/types';

describe('isFetchingInstruments selectors', () => {
    describe('createIsFetchingInstrumentsSelector()', () => {
        let isFetchingInstruments: boolean;
        let store: BehaviorSubject<TAppState>;

        beforeEach(() => {
            isFetchingInstruments = true;
            store = new BehaviorSubject(<TAppState>{ isFetchingInstruments });
        });

        it('should select the value of isFetchingInstruments', async () => {
            const slice = await firstValueFrom(createIsFetchingInstrumentsSelector(store));

            expect(slice).toEqual(isFetchingInstruments);
        });
    });
});
