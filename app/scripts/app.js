var angular = require('angular'),
    angularRoute = require('angular-route'),
    client = require('./modules/client/module.js');

module.exports = angular
    .module('app', [
        angularRoute,
        client.name
    ])

    .config([ '$routeProvider', ($routeProvider) => $routeProvider.otherwise({ redirectTo: '/instruments' }) ]);
