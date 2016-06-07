var angular = require('angular'),
    browser = require('../browser/module.js'),
    client = require('./components/client.js'),
    ClientController = require('./controllers/client.js'),
    registry = require('../registry/module.js'),
    slot = require('../slot/module.js');

module.exports = angular
    .module('client', [
        browser.name,
        registry.name,
        slot.name
    ])

    .component('client', client)

    .controller('ClientController', [ 'browserService', ClientController ]);
