var angular = require('angular'),
    generatorsServiceProvider = require('./providers/generators.js'),
    peerConnectingService = require('./services/peer-connecting.js');

module.exports = angular
    .module('generators', [])

    .provider('generatorsService', generatorsServiceProvider)

    .service('peerConnectingService', [ peerConnectingService ]);
