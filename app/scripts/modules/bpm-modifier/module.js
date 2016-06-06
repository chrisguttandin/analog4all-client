var angular = require('angular'),
    bpmModifier = require('./components/bpm-modifier.js'),
    BpmModifierController = require('./controllers/bpm-modifier.js');

module.exports = angular
    .module('bpmModifier', [])

    .component('bpmModifier', bpmModifier)

    .controller('BpmModifierController', [ '$scope', BpmModifierController ]);
