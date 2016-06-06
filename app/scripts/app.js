var angular = require('angular'),
    angularRoute = require('angular-route'),
    browser = require('./modules/browser/module.js'),
    dropped = require('./modules/dropped/module.js'),
    registry = require('./modules/registry/module.js'),
    slot = require('./modules/slot/module.js');

module.exports = angular
    .module('client', [
        angularRoute,
        browser.name,
        dropped.name,
        registry.name,
        slot.name
    ])

    .config([ '$routeProvider', ($routeProvider) => $routeProvider.otherwise({ redirectTo: '/instruments' }) ]);
