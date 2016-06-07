import { FileInputController } from './controllers/file-input';
import angular from 'angular';
import dropped from '../dropped/module';
import { fileInput } from './components/file-input';

export default angular
    .module('fileInput', [
        dropped.name
    ])

    .component('fileInput', fileInput)

    .controller('FileInputController', [ '$scope', FileInputController ]);
