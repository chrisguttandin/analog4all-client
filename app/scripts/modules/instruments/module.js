import { InstrumentsService } from './services/instruments';
import angular from 'angular';

export default angular
    .module('instruments', [])

    .service('instrumentsService', [ '$http', '$sce', InstrumentsService ]);
