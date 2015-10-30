'use strict';

var fs = require('fs');

module.exports = function () {
    return {
        bindToController: true,
        controller: 'RegistryController',
        controllerAs: 'registry',
        require: [
            'instruments'
        ],
        restrict: 'E',
        scope: {
            instruments: '='
        },
        template: fs.readFileSync(__dirname + '/../views/registry.html', 'utf8')
    };
};
