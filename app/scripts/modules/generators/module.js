var angular = require('angular'),
    generatorsServiceProvider = require('./providers/generators.js');

module.exports = angular
    .module('generators', [])

    .provider('generatorsService', generatorsServiceProvider);
