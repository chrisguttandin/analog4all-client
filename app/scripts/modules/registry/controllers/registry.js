class RegistryController {

    constructor (instruments, instrumentsService, $scope) {
        this.instruments = instruments;
        this._instrumentsService = instrumentsService;
        this._$scope = $scope;
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
