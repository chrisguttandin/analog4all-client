'use strict';

class PeerConnectingService {

    constructor (peerConnectorFactoryService) {
        this._peerConnectorFactoryService = peerConnectorFactoryService;
    }

    connect (channelBroker) {
        var errorSubscription,
            messageSubscription,
            peerConnector;

        peerConnector = this._peerConnectorFactoryService.create({
            channelBroker: channelBroker
        });

        errorSubscription = channelBroker.addErrorHandler(::peerConnector.fail);
        messageSubscription = channelBroker.addMessageHandler(::peerConnector.handle);

        return new Promise(function (resolve, reject) {
            peerConnector.on('done', function (err, dataChannel) {
                errorSubscription.cancel();
                messageSubscription.cancel();

                if (err === null) {
                    resolve(dataChannel);
                } else {
                    reject(err);
                }
            });
        });
    }

}

module.exports = PeerConnectingService;
