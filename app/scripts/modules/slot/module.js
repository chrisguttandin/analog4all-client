var angular = require('angular'),
    fileInput = require('../file-input/module.js'),
    slot = require('./directives/slot.js'),
    SlotController = require('./controllers/slot.js');

module.exports = angular
    .module('slot', [
        fileInput.name
    ])

    .controller('SlotController', ['generatorsService', 'renderingService', '$scope', SlotController])

    .directive('slot', slot);
