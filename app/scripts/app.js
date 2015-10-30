'use strict';

var angular = require('angular'),
    angularRoute = require('angular-route'),
    channelBrokerFactoryService = require('./services/channel-broker-factory.js'),
    dropped = require('./modules/dropped/module.js'),
    fileReceiverFactoryService = require('./services/file-receiver-factory.js'),
    fileReceivingService = require('./services/file-receiving.js'),
    fileSenderFactoryService = require('./services/file-sender-factory.js'),
    fileSendingService = require('./services/file-sending.js'),
    generators = require('./modules/generators/module.js'),
    instruments = require('./modules/instruments/module.js'),
    peerConnectingService = require('./services/peer-connecting.js'),
    peerConnectorFactoryService = require('./services/peer-connector-factory.js'),
    readFileSync = require('fs').readFileSync,
    registry = require('./modules/registry/module.js'),
    renderingService = require('./services/rendering.js'),
    slot = require('./modules/slot/module.js');

module.exports = angular
    .module('client', [
        angularRoute,
        dropped.name,
        generators.name,
        instruments.name,
        registry.name,
        slot.name
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/instruments', {
                template: readFileSync(__dirname + '/../views/instruments.html', 'utf8')
            })
            .when('/instruments/:instrumentId', {
                controller: ['instrument', function (instrument) {
                    this.instrument = instrument;
                }],
                controllerAs: 'vm',
                resolve: {
                    instrument: ['instrumentsService', '$route', function (instrumentsService, $route) {
                        return instrumentsService.get($route.current.params.instrumentId);
                    }]
                },
                template: readFileSync(__dirname + '/../views/instrument.html', 'utf8')
            })
            .otherwise({
                redirectTo: '/instruments'
            });
    }])

    .service('channelBrokerFactoryService', [channelBrokerFactoryService])
    .service('fileReceiverFactoryService', [fileReceiverFactoryService])
    .service('fileReceivingService', ['fileReceiverFactoryService', fileReceivingService])
    .service('fileSenderFactoryService', [fileSenderFactoryService])
    .service('fileSendingService', ['fileSenderFactoryService', fileSendingService])
    .service('peerConnectingService', ['peerConnectorFactoryService', peerConnectingService])
    .service('peerConnectorFactoryService', [peerConnectorFactoryService])
    .service('renderingService', ['fileReceivingService', 'fileSendingService', renderingService]);
