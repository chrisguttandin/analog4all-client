'use strict';

var  midiJsonParser = require('midi-json-parser');

class SlotController {

    constructor (channelBrokerFactoryService, generatorsService, renderingService, $scope) {
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

    async render () {
        var channel,
            generator;

        this.isRendering = true;

        // this.connectionState = 'connecting';

        try {
            generator = await this._generatorsService.create({
                instrument: {
                    id: this.instrument.id
                }
            });

            channel = await this._generatorsService.connect(generator);

            // this.connectionState = 'connected';
            // this._$scope.$evalAsync();

            await this._renderingService.render(this._midiFile, this._channelBrokerFactoryService.create({ channel }));
        } catch (err) {
            console.log(err);
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
                .then(() => {
                    this._midiFile = file;
                    this.hasValidMidiFile = true;

                    this._$scope.$evalAsync();
                })
                .catch(() => {
                    // @todo
                });
        }

        fileReader.readAsArrayBuffer(file);
    }

}

module.exports = SlotController;
