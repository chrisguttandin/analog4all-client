'use strict';

var angular = require('angular'),
    registry = require('./directives/registry.js'),
    RegistryController = require('./controllers/registry.js')

module.exports = angular
    .module('registry', [])

    .controller('RegistryController', ['instrumentsService', '$sce', '$scope', RegistryController])

    .directive('registry', registry);
