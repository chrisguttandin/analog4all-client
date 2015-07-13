'use strict';

module.exports = function ($http) {

    class Instruments {

        constructor ($http) {
            this._$http = $http;
        }

        fetch () {
            return new Promise((resolve, reject) => {
                this._$http
                    .get('http://analog4all-registry.elasticbeanstalk.com/instruments')
                    .success((data) => resolve(data))
                    .error((data, status, headers, config) => {
                        console.log('error while fetching instruments', data, status, headers, config);

                        resolve([]);
                    });
            });
        }

    }

    return new Instruments($http);
}
