'use strict';

var angular = require('angular'),
    browser = require('./directives/browser.js'),
    BrowserController = require('./controllers/browser.js'),
    generators = require('../generators/module.js');

module.exports = angular
    .module('browser', [
        generators.name
    ])

    .config(['generatorsServiceProvider', '$provide', function (generatorsServiceProvider, $provide) {
        $provide.constant('isSupported', generatorsServiceProvider.isSupported);
    }])

    .controller('BrowserController', ['isSupported', BrowserController])

    .directive('browser', browser);
