'use strict';

class SlotController {

    constructor (generatorsService, renderingService, $scope) {
        this._channel = null;
        this.connectionState = 'disconnected';
        this._generatorsService = generatorsService;
        this._renderingService = renderingService;
        this.renderState = 'unknown';
        this._$scope = $scope;
    }

    connect () {
        this.connectionState = 'connecting';

        this._generatorsService
            .create({
                instrument: {
                    id: this.instrument.id
                }
            })
            .then((generator) => this._generatorsService.connect(generator))
            .then((channel) => {
                this._channel = channel;
                this.connectionState = 'connected';

                this._$scope.$evalAsync();
            })
            .catch((err) => {
                this.connectionState = 'disconnected';

                this._$scope.$evalAsync();
            });
    }

    disconnect () {
        this._channel.close();

        this._channel = null;
        this.connectionState = 'disconnected';
    }

    send (file) {
        var renderer = this._renderingService.render(file, this._channel);

        renderer.on('statechange', (state) => {
            this.renderState = state;

            this._$scope.$evalAsync();

            if (state === 'unknown') {
                this.disconnect();
            }
        });
    }

}

module.exports = SlotController;
