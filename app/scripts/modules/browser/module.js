import { BrowserService } from './services/browser';
import angular from 'angular';
import generators from '../generators/module';

export default angular
    .module('browser', [
        generators.name
    ])

    .config(['generatorsServiceProvider', '$provide', function (generatorsServiceProvider, $provide) {
        $provide.constant('isSupported', generatorsServiceProvider.isSupported);
    }])

    .service('browserService', [ 'isSupported', BrowserService ]);
