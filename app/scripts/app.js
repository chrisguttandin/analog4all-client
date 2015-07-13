'use strict';

var angular = require('angular'),
    dropped = require('./modules/dropped/module.js'),
    generators = require('./modules/generators/module.js'),
    instruments = require('./modules/instruments/module.js'),
    receivingService = require('./services/receiving.js'),
    registry = require('./modules/registry/module.js'),
    renderingService = require('./services/rendering.js'),
    slot = require('./modules/slot/module.js');

module.exports = angular
    .module('client', [
        dropped.name,
        generators.name,
        instruments.name,
        registry.name,
        slot.name
    ])

    .service('receivingService', receivingService)
    .service('renderingService', ['receivingService', renderingService]);
