class Instruments {

    constructor ($http, $sce) {
        this._$http = $http;
        this._$sce = $sce;
    }

    fetch () {
        return new Promise((resolve) => {
            this._$http
                .get('https://analog4all-registry.eu-west-1.elasticbeanstalk.com/instruments')
                .success((instruments) => {
                    instruments.forEach((instrument) => {
                        if (instrument.sample) {
                            instrument.sample.url = this._$sce.trustAsResourceUrl(`https://analog4all-registry.eu-west-1.elasticbeanstalk.com/samples/${ instrument.sample.id }.wav`);
                        }
                    });

                    resolve(instruments);
                })
                .error((data, status, headers, config) => {
                    console.log('error while fetching instruments', data, status, headers, config); // eslint-disable-line no-console

                    resolve([]);
                });
        });
    }

    get (id) {
        return new Promise((resolve, reject) => {
            this._$http
                .get('https://analog4all-registry.eu-west-1.elasticbeanstalk.com/instruments/' + id)
                .success((instrument) => {
                    if (instrument.sample) {
                        instrument.sample.url = this._$sce.trustAsResourceUrl(`https://analog4all-registry.eu-west-1.elasticbeanstalk.com/samples/${ instrument.sample.id }.wav`);
                    }

                    resolve(instrument);
                })
                .error((data, status, headers, config) => {
                    console.log('error while fetching instruments', data, status, headers, config); // eslint-disable-line no-console

                    reject();
                });
        });
    }

}

module.exports = Instruments;
