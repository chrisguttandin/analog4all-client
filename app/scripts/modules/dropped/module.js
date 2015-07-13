'use strict';

var angular = require('angular'),
    dragenter = require('./directives/dragenter.js'),
    dragleave = require('./directives/dragleave.js'),
    drop = require('./directives/drop.js');

module.exports = angular
    .module('dropped', [])

    .directive('dragenter', ['$parse', dragenter])
    .directive('dragleave', ['$parse', dragleave])
    .directive('drop', ['$parse', drop]);
