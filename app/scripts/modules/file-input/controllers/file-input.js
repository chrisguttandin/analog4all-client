import { parseArrayBuffer } from 'midi-json-parser';

export class FileInputController {

    constructor ($scope) {
        this._$scope = $scope;
    }

    $onInit () {
        this.isParsing = false;
        this.isWaitingForFirstFile = true;
        this.isWaitingForRetry = false;
    }

    validate (file) {
        var fileReader = new FileReader();

        if (this.isParsing) {
            return;
        }

        this.isParsing = true;
        this.isWaitingForFirstFile = false;
        this.isWaitingForRetry = false;

        fileReader.onload = () => {
            parseArrayBuffer(fileReader.result)
                .then((json) => this.onChange({ fileName: file.name, json }))
                .catch(() => {
                    this.isParsing = false;
                    this.isWaitingForRetry = true;

                    this._$scope.$evalAsync();
                });
        };

        fileReader.readAsArrayBuffer(file);
    }

}
