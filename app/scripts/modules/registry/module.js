var angular = require('angular'),
    registry = require('./directives/registry.js'),
    RegistryController = require('./controllers/registry.js')

module.exports = angular
    .module('registry', [])

    .controller('RegistryController', ['instrumentsService', '$scope', RegistryController])

    .directive('registry', registry);
