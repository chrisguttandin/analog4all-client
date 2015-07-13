'use strict';

var angular = require('angular'),
    slot = require('./directives/slot.js'),
    SlotController = require('./controllers/slot.js');

module.exports = angular
    .module('slot', [])

    .controller('SlotController', ['generatorsService', 'renderingService', '$scope', SlotController])

    .directive('slot', slot);
