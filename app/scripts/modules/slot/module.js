var angular = require('angular'),
    bpmModifier = require('../bpm-modifier/module.js'),
    fileInput = require('../file-input/module.js'),
    fileReceivingService = require('./services/file-receiving.js'),
    fileSendingService = require('./services/file-sending.js'),
    generators = require('../generators/module.js'),
    instruments = require('../instruments/module.js'),
    renderingService = require('./services/rendering.js'),
    slot = require('./routes/slot.js'),
    SlotController = require('./controllers/slot.js');

module.exports = angular
    .module('slot', [
        bpmModifier.name,
        fileInput.name,
        generators.name,
        instruments.name
    ])

    .config([ '$routeProvider', ($routeProvider) => $routeProvider.when('/instruments/:instrumentId', slot) ])

    .controller('SlotController', [ 'generatorsService', 'instrument', 'renderingService', '$scope', SlotController ])

    .service('fileReceivingService', [ fileReceivingService ])
    .service('fileSendingService', [ fileSendingService ])
    .service('renderingService', [ 'fileReceivingService', 'fileSendingService', renderingService ]);
