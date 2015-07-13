'use strict';

var fs = require('fs');

module.exports = function () {
    return {
        bindToController: true,
        controller: 'RegistryController',
        controllerAs: 'registry',
        restrict: 'E',
        template: fs.readFileSync(__dirname + '/../views/registry.html', 'utf8')
    };
};
