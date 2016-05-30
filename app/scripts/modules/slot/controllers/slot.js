var jsonMidiEncoder = require('json-midi-encoder'),
    midiJsonParser = require('midi-json-parser');

class SlotController {

    constructor (channelBrokerFactoryService, generatorsService, renderingService, $scope) {
        this.bpm = 120;
        // this._channel = null;
        this._channelBrokerFactoryService = channelBrokerFactoryService;
        // this.connectionState = 'disconnected';
        this._generatorsService = generatorsService;
        this.hasValidMidiFile = false;
        this.isRendering = false;
        this._renderingService = renderingService;
        // this.renderState = 'unknown';
        this._$scope = $scope;
    }

    // @todo A very similar function exists in the midi-file-slicer module.
    _readMicrosecondsPerBeat (json) {
        for (let i = 0, length = json.tracks.length; i < length; i += 1) {
            let track = json.tracks[i];

            for (let j = 0, length = track.length; j < length; j += 1) {
                let event = track[j];

                if (event.setTempo !== undefined) {
                    return event.setTempo.microsecondsPerBeat;
                }
            }
        }
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

            this._writeMicrosecondsPerBeat(this._midiFileAsJson, 60000000 / this.bpm);

            midiFile = await jsonMidiEncoder.encodeJSON(this._midiFileAsJson);
            midiFile = new File([ midiFile ], this._midiFileName, { type: 'audio/midi' });

            await this._renderingService.render(midiFile, this._channelBrokerFactoryService.create({ channel }));
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

    async validate (file) {
        var fileReader = new FileReader();

        fileReader.onload = () => {
            midiJsonParser
                .parseArrayBuffer(fileReader.result)
                .then((json) => {
                    let microsecondsPerBeat = this._readMicrosecondsPerBeat(json);

                    if (microsecondsPerBeat) {
                        this.bpm = 60000000 / microsecondsPerBeat;
                    }

                    this._midiFileAsJson = json;
                    this._midiFileName = file.name;
                    this.hasValidMidiFile = true;

                    this._$scope.$evalAsync();
                })
                .catch(() => {
                    // @todo
                });
        }

        fileReader.readAsArrayBuffer(file);
    }

    _writeMicrosecondsPerBeat (json, microsecondsPerBeat) {
        for (let i = 0, length = json.tracks.length; i < length; i += 1) {
            let track = json.tracks[i];

            for (let j = 0, length = track.length; j < length; j += 1) {
                let event = track[j];

                if (event.setTempo !== undefined) {
                    event.setTempo.microsecondsPerBeat = microsecondsPerBeat;

                    return;
                }
            }
        }

        json.tracks[0].unshift({
            delta: 0,
            setTempo: {
                microsecondsPerBeat
            }
        });
    }

}

module.exports = SlotController;
