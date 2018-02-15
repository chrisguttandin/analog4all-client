import { SET_IS_FETCHING_INSTRUMENTS, setIsFetchingInstruments } from '../../../../src/app/store/actions';

describe('isFetchingInstruments actions', () => {

    describe('setIsFetchingInstruments()', () => {

        it('should create an action', () => {
            const isFetchingInstruments = true;
            const action = setIsFetchingInstruments(isFetchingInstruments);

            expect(action).toEqual({ payload: isFetchingInstruments, type: SET_IS_FETCHING_INSTRUMENTS });
        });

    });

});
