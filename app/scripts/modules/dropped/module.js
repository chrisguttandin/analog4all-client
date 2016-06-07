import angular from 'angular';
import { dragenter } from './directives/dragenter';
import { dragleave } from './directives/dragleave';
import { drop } from './directives/drop';

export default angular
    .module('dropped', [])

    .directive('dragenter', [ '$parse', dragenter ])
    .directive('dragleave', [ '$parse', dragleave ])
    .directive('drop', [ '$parse', drop ]);
