var angular = require('angular'),
    angularRoute = require('angular-route'),
    instruments = require('../instruments/module.js'),
    registry = require('./route/registry.js'),
    RegistryController = require('./controllers/registry.js')

module.exports = angular
    .module('registry', [
        angularRoute,
        instruments.name,
    ])

    .config([ '$routeProvider', ($routeProvider) => $routeProvider.when('/instruments', registry) ])

    .controller('RegistryController', [ 'instruments', 'instrumentsService', '$scope', RegistryController ]);
