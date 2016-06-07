import { BrowserService } from './services/browser';
import angular from 'angular';
import generators from '../generators/module';

export default angular
    .module('browser', [
        generators.name
    ])

    .service('browserService', [ 'generatorsService', BrowserService ]);
