import {
    FETCH_INSTRUMENT,
    FETCH_INSTRUMENTS,
    FETCH_INSTRUMENTS_FAIL,
    FETCH_INSTRUMENTS_SUCCESS,
    FETCH_INSTRUMENT_FAIL,
    FETCH_INSTRUMENT_SUCCESS,
    UPDATE_INSTRUMENTS,
    UPSERT_INSTRUMENT,
    fetchInstrument,
    fetchInstrumentFail,
    fetchInstrumentSuccess,
    fetchInstruments,
    fetchInstrumentsFail,
    fetchInstrumentsSuccess,
    updateInstruments,
    upsertInstrument
} from '../../../../src/app/store/actions';

describe('instruments actions', () => {
    describe('fetchInstrument()', () => {
        it('should create an action', () => {
            const id = 'a fake id';
            const action = fetchInstrument(id);

            expect(action).toEqual({ payload: id, type: FETCH_INSTRUMENT });
        });
    });

    describe('fetchInstrumentFail()', () => {
        it('should create an action', () => {
            const id = 'a fake id';
            const action = fetchInstrumentFail(id);

            expect(action).toEqual({ payload: id, type: FETCH_INSTRUMENT_FAIL });
        });
    });

    describe('fetchInstrumentSuccess()', () => {
        it('should create an action', () => {
            const instrument = {
                created: 1518284684850,
                id: 'a fake id',
                isAvailable: false,
                modified: 1518284684850,
                name: 'a fake name'
            };
            const action = fetchInstrumentSuccess(instrument);

            expect(action).toEqual({ payload: instrument, type: FETCH_INSTRUMENT_SUCCESS });
        });
    });

    describe('fetchInstruments()', () => {
        it('should create an action', () => {
            const action = fetchInstruments();

            expect(action).toEqual({ type: FETCH_INSTRUMENTS });
        });
    });

    describe('fetchInstrumentsFail()', () => {
        it('should create an action', () => {
            const action = fetchInstrumentsFail();

            expect(action).toEqual({ type: FETCH_INSTRUMENTS_FAIL });
        });
    });

    describe('fetchInstrumentsSuccess()', () => {
        it('should create an action', () => {
            const instruments = [
                {
                    created: 1518284684850,
                    id: 'a fake id',
                    isAvailable: false,
                    modified: 1518284684850,
                    name: 'a fake name'
                }
            ];
            const action = fetchInstrumentsSuccess(instruments);

            expect(action).toEqual({ payload: instruments, type: FETCH_INSTRUMENTS_SUCCESS });
        });
    });

    describe('updateInstruments()', () => {
        it('should create an action', () => {
            const instruments = [
                {
                    created: 1518284684850,
                    id: 'a fake id',
                    isAvailable: false,
                    modified: 1518284684850,
                    name: 'a fake name'
                }
            ];
            const action = updateInstruments(instruments);

            expect(action).toEqual({ payload: instruments, type: UPDATE_INSTRUMENTS });
        });
    });

    describe('upsertInstrument()', () => {
        it('should create an action', () => {
            const instrument = {
                created: 1518284684850,
                id: 'a fake id',
                isAvailable: false,
                modified: 1518284684850,
                name: 'a fake name'
            };
            const action = upsertInstrument(instrument);

            expect(action).toEqual({ payload: instrument, type: UPSERT_INSTRUMENT });
        });
    });
});
