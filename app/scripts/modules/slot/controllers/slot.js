import { encodeJSON } from 'json-midi-encoder';
import { wrap } from 'rxjs-broker';

export class SlotController {

    constructor (generatorsService, instrument, renderingService, $scope) {
        this.bpm = 120;
        this._generatorsService = generatorsService;
        this.hasValidMidiFile = false;
        this.instrument = instrument;
        this.isRendering = false;
        this._renderingService = renderingService;
        this._$scope = $scope;
    }

    async render () {
        var channel,
            generator;

        this.isRendering = true;

        try {
            let midiFile;

            generator = await this._generatorsService.create({
                instrument: {
                    id: this.instrument.id
                }
            });

            channel = await this._generatorsService.connect(generator);

            midiFile = await encodeJSON(this.json);
            midiFile = new File([ midiFile ], this._midiFileName, { type: 'audio/midi' });

            await this._renderingService.render(wrap(channel), midiFile);
        } catch (err) {
            console.log(err); // eslint-disable-line no-console
        }

        this.isRendering = false;

        if (channel) {
            channel.close();
        }

        this._$scope.$evalAsync();
    }

    updateInput (json, fileName) {
        this.json = json;
        this._midiFileName = fileName;
        this.hasValidMidiFile = true;

        this._$scope.$evalAsync();
    }

    updateJson (json) {
        this.json = json;

        this._$scope.$evalAsync();
    }

}
