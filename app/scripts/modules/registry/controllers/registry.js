'use strict';

class RegistryController {

    constructor (instrumentsService, $scope) {
        this.instruments = [];
        this._instrumentsService = instrumentsService;
        this._$scope = $scope;

        this.refresh();
    }

    refresh () {
        this._instrumentsService
            .fetch()
            .then((instruments) => {
                this.instruments = instruments.filter((instrument) => instrument.isAvailable);

                this._$scope.$evalAsync();
            });
    }

}

module.exports = RegistryController;
