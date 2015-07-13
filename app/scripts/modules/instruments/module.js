'use strict';

var angular = require('angular'),
    instrumentsService = require('./services/instruments.js');

module.exports = angular
    .module('instruments', [])

    .service('instrumentsService', ['$http', instrumentsService]);
