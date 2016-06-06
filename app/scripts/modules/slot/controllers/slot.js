var jsonMidiEncoder = require('json-midi-encoder'),
    wrap = require('rxjs-broker').wrap;

class SlotController {

    constructor (generatorsService, renderingService, $scope) {
        this.bpm = 120;
        // this._channel = null;
        // this.connectionState = 'disconnected';
        this._generatorsService = generatorsService;
        this.hasValidMidiFile = false;
        this.isRendering = false;
        this._renderingService = renderingService;
        // this.renderState = 'unknown';
        this._$scope = $scope;
    }

    async render () {
        var channel,
            generator;

        this.isRendering = true;

        // this.connectionState = 'connecting';

        try {
            let midiFile;

            generator = await this._generatorsService.create({
                instrument: {
                    id: this.instrument.id
                }
            });

            channel = await this._generatorsService.connect(generator);

            // this.connectionState = 'connected';
            // this._$scope.$evalAsync();

            midiFile = await jsonMidiEncoder.encodeJSON(this.json);
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

        // this.connectionState = 'disconnected';
        // this._$scope.$evalAsync();

        // var renderer = this._renderingService.render(file, this._channel);
        //
        // renderer.on('statechange', (state) => {
        //     this.renderState = state;
        //
        //     this._$scope.$evalAsync();
        //
        //     if (state === 'unknown') {
        //         this.disconnect();
        //     }
        // });
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

module.exports = SlotController;
