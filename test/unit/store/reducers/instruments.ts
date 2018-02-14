import { IInstrument } from '../../../../src/app/interfaces';
import { instrumentsReducer } from '../../../../src/app/store/reducers';

describe('instruments reducer', () => {

    describe('with an undefined state', () => {

        describe('with an empty action', () => {

            it('should return the default state', () => {
                const state = instrumentsReducer(undefined, <any> { });

                expect(state).toEqual([ ]);
            });

        });

        describe('with an action of type UPDATE_INSTRUMENT', () => {

            it('should throw an error', () => {
                const instrument = {
                    id: 'a fake id'
                };

                expect(() => {
                    instrumentsReducer(undefined, { payload: instrument, type: 'UPDATE_INSTRUMENT' });
                }).toThrow(new Error('An instrument with the same id is not stored.'));
            });

        });

        describe('with an action of type UPDATE_INSTRUMENTS', () => {

            it('should return the given instruments', () => {
                const instruments = [ {
                    created: 1518284684850,
                    id: 'a fake id',
                    isAvailable: false,
                    modified: 1518284684850,
                    name: 'a fake name'
                } ];
                const state = instrumentsReducer(undefined, { payload: instruments, type: 'UPDATE_INSTRUMENTS' });

                expect(state).toEqual(instruments);
            });

        });

    });

    describe('with an array of instruments as state', () => {

        let previousState: IInstrument[];

        beforeEach(() => {
            previousState = [ {
                created: 1518284684850,
                id: 'a fake id',
                isAvailable: false,
                modified: 1518284684850,
                name: 'a fake name'
            } ];
        });

        describe('with an empty action', () => {

            it('should return the previous state', () => {
                const state = instrumentsReducer(previousState, <any> { });

                expect(state).toEqual(previousState);
            });

        });

        describe('with an action of type UPDATE_INSTRUMENT', () => {

            it('should return an updated array of instruments', () => {
                const instrument = {
                    id: 'a fake id',
                    name: 'another fake name'
                };
                const state = instrumentsReducer(previousState, { payload: instrument, type: 'UPDATE_INSTRUMENT' });

                expect(state).toEqual([ { ...previousState[0], ...instrument } ]);
            });

        });

        describe('with an action of type UPDATE_INSTRUMENTS', () => {

            it('should return an updated array of instruments', () => {
                const instruments = [ {
                    created: 1518284684850,
                    id: 'a fake id',
                    isAvailable: true,
                    modified: 1518284684851,
                    name: 'another fake name'
                } ];
                const state = instrumentsReducer(previousState, { payload: instruments, type: 'UPDATE_INSTRUMENTS' });

                expect(state).toEqual([ { ...previousState[0], ...instruments[0] } ]);
            });

        });

    });

});
