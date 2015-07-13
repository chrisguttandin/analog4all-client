'use strict';

var angular = require('angular'),
    GeneratorsService = require('./services/generators.js');

module.exports = angular
    .module('generators', [])

    .service('generatorsService', ['$http', GeneratorsService]);
