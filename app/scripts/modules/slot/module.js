var angular = require('angular'),
    bpmModifier = require('../bpm-modifier/module.js'),
    fileInput = require('../file-input/module.js'),
    slot = require('./directives/slot.js'),
    SlotController = require('./controllers/slot.js');

module.exports = angular
    .module('slot', [
        bpmModifier.name,
        fileInput.name
    ])

    .controller('SlotController', ['generatorsService', 'renderingService', '$scope', SlotController])

    .directive('slot', slot);
