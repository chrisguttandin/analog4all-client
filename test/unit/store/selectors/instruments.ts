import { IAppState, IInstrument } from '../../../../src/app/store/interfaces';
import { createInstrumentByIdSelector, selectInstruments } from '../../../../src/app/store/selectors';

describe('instruments selectors', () => {

    describe('without any instrument', () => {

        let instruments: IInstrument[];

        beforeEach(() => {
            instruments = [ ];
        });

        describe('createInstrumentByIdSelector()', () => {

            it('should select the value of null', () => {
                const id = 'a fake id';
                const selector = createInstrumentByIdSelector(id);
                const slice = selector(<IAppState> { instruments });

                expect(slice).toEqual(null);
            });

        });

        describe('selectInstruments()', () => {

            it('should select the value of instruments', () => {
                const slice = selectInstruments(<IAppState> { instruments });

                expect(slice).toEqual(instruments);
            });

        });

    });

    describe('with an instrument', () => {

        let instruments: IInstrument[];

        beforeEach(() => {
            const instrument = {
                created: 1518284684850,
                id: 'a fake id',
                isAvailable: false,
                modified: 1518284684850,
                name: 'a fake name'
            };

            instruments = [ instrument ];
        });

        describe('createInstrumentByIdSelector()', () => {

            it('should select the instrument with the given id', () => {
                const selector = createInstrumentByIdSelector(instruments[0].id);
                const slice = selector(<IAppState> { instruments });

                expect(slice).toEqual(instruments[0]);
            });

        });

        describe('selectInstruments()', () => {

            it('should select the value of instruments', () => {
                const slice = selectInstruments(<IAppState> { instruments });

                expect(slice).toEqual(instruments);
            });

        });

    });

});
