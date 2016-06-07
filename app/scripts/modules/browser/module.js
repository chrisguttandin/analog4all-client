var angular = require('angular'),
    browserService = require('./services/browser.js'),
    generators = require('../generators/module.js');

module.exports = angular
    .module('browser', [
        generators.name
    ])

    .config(['generatorsServiceProvider', '$provide', function (generatorsServiceProvider, $provide) {
        $provide.constant('isSupported', generatorsServiceProvider.isSupported);
    }])

    .service('browserService', [ 'isSupported', browserService ]);
