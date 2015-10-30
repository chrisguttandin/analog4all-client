'use strict';

class RegistryController {

    constructor (instrumentsService, $sce, $scope) {
        this.instruments = [];
        this._instrumentsService = instrumentsService;
        this._$sce = $sce;
        this._$scope = $scope;

        this.refresh();
    }

    refresh () {
        this._instrumentsService
            .fetch()
            .then((instruments) => {
                this.instruments = instruments.filter((instrument) => instrument.isAvailable);

                this.instruments.forEach((instrument) => {
                    if (instrument.sample) {
                        instrument.sample.url = this._$sce.trustAsResourceUrl(`http://analog4all-registry.elasticbeanstalk.com/samples/${instrument.sample.id}.wav`);
                    }
                });

                this._$scope.$evalAsync();
            });
    }

}

module.exports = RegistryController;
