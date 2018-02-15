import { IAppState } from '../../../../src/app/store/interfaces';
import { selectIsFetchingInstruments } from '../../../../src/app/store/selectors';

describe('isFetchingInstruments selectors', () => {

    describe('selectIsFetchingInstruments()', () => {

        it('should select the value of isFetchingInstruments', () => {
            const isFetchingInstruments = true;
            const slice = selectIsFetchingInstruments(<IAppState> { isFetchingInstruments });

            expect(slice).toEqual(isFetchingInstruments);
        });

    });

});
