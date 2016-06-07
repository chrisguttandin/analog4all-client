import { connect } from 'rxjs-broker';

export class GeneratorsService {

    constructor ($http, peerConnectingService) {
        this._$http = $http;
        this._peerConnectingService = peerConnectingService;
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
