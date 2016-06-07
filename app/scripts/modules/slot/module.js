import { FileReceivingService } from './services/file-receiving';
import { FileSendingService } from './services/file-sending';
import { RenderingService } from './services/rendering';
import { SlotController } from './controllers/slot';
import { WaitingService } from './services/waiting';
import angular from 'angular';
import angularRoute from 'angular-route';
import bpmModifier from '../bpm-modifier/module';
import fileInput from '../file-input/module';
import generators from '../generators/module';
import instruments from '../instruments/module';
import { slot } from './routes/slot';

export default angular
    .module('slot', [
        angularRoute,
        bpmModifier.name,
        fileInput.name,
        generators.name,
        instruments.name
    ])

    .config([ '$routeProvider', ($routeProvider) => $routeProvider.when('/instruments/:instrumentId', slot) ])

    .controller('SlotController', [ 'generatorsService', 'instrument', 'renderingService', '$scope', SlotController ])

    .service('fileReceivingService', [ FileReceivingService ])
    .service('fileSendingService', [ FileSendingService ])
    .service('renderingService', [ 'fileReceivingService', 'fileSendingService', 'waitingService', RenderingService ])
    .service('waitingService', [ WaitingService ]);
