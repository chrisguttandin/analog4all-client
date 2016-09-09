import { connect } from 'rxjs-broker';

export class GeneratorsService {

    constructor ($http, peerConnectingService) {
        this._$http = $http;
        this._peerConnectingService = peerConnectingService;
    }

    /**
     * This property is true if the browser supports all the required APIs to use the
     * GeneratorsService. The code is roughly copied from [Modernizr's feature detection tests]
     * {@link https://github.com/Modernizr/Modernizr/blob/master/feature-detects/}
     */
    get isSupported () { // eslint-disable-line class-methods-use-this
        if ('WebSocket' in window && 'webkitRTCPeerConnection' in window) {
            /* eslint-disable indent */
            let peerConnection = new webkitRTCPeerConnection({ // eslint-disable-line new-cap, no-undef
                    iceServers: [ { urls: 'stun:0' } ]
                });
            /* eslint-enable indent */

            return 'createDataChannel' in peerConnection;
        }

        return false;
    }

    async connect (generator) {
        var dataChannel,
            webSocketSubject;

        webSocketSubject = await connect('wss://analog4all-registry.eu-west-1.elasticbeanstalk.com/instruments/' + generator.instrument.id + '/generators/' + generator.id);

        dataChannel = await this._peerConnectingService.connect(webSocketSubject);

        webSocketSubject.close();

        return dataChannel;
    }

    create (data) {
        return new Promise((resolve, reject) => {
            this._$http
                .post('https://analog4all-registry.eu-west-1.elasticbeanstalk.com/instruments/' + data.instrument.id + '/generators')
                .success((data) => resolve(data))
                .error((data, status, headers, config) => {
                    console.log('error while creating a generator', data, status, headers, config); // eslint-disable-line no-console

                    reject();
                });
        });
    }

}
