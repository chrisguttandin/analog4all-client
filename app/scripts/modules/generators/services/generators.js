'use strict';

class Generators {

    constructor (channelBrokerFactoryService, $http, peerConnectingService) {
        this._channelBrokerFactoryService = channelBrokerFactoryService;
        this._$http = $http;
        this._peerConnectingService = peerConnectingService;
    }

    async connect (generator) {
        var dataChannel,
            channelBroker,
            socket;

        socket = new WebSocket('ws://analog4all-registry.elasticbeanstalk.com/instruments/' + generator.instrument.id + '/generators/' + generator.id);
        channelBroker = this._channelBrokerFactoryService.create({
            channel: socket
        });

        dataChannel = await this._peerConnectingService.connect(channelBroker);

        socket.close();

        return dataChannel;
    }

    create (data) {
        return new Promise((resolve, reject) => {
            this._$http
                .post('http://analog4all-registry.elasticbeanstalk.com/instruments/' + data.instrument.id + '/generators')
                .success((data) => resolve(data))
                .error((data, status, headers, config) => {
                    console.log('error while creating a generator', data, status, headers, config);

                    reject();
                });
        });
    }

}

module.exports = Generators;
