import { BpmModifierController } from './controllers/bpm-modifier';
import angular from 'angular';
import { bpmModifier } from './components/bpm-modifier';

export default angular
    .module('bpmModifier', [])

    .component('bpmModifier', bpmModifier)

    .controller('BpmModifierController', [ '$scope', BpmModifierController ]);
