import { UPDATE_INSTRUMENT, UPDATE_INSTRUMENTS, updateInstrument, updateInstruments } from '../../../../src/app/store/actions';

describe('instruments actions', () => {

    describe('updateInstrument()', () => {

        it('should create an action', () => {
            const instrument = {
                created: 1518284684850,
                id: 'a fake id',
                isAvailable: false,
                modified: 1518284684850,
                name: 'a fake name'
            };
            const action = updateInstrument(instrument);

            expect(action).toEqual({ payload: instrument, type: UPDATE_INSTRUMENT });
        });

    });

    describe('updateInstruments()', () => {

        it('should create an action', () => {
            const instruments = [ {
                created: 1518284684850,
                id: 'a fake id',
                isAvailable: false,
                modified: 1518284684850,
                name: 'a fake name'
            } ];
            const action = updateInstruments(instruments);

            expect(action).toEqual({ payload: instruments, type: UPDATE_INSTRUMENTS });
        });

    });

});
