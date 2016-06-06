var angular = require('angular'),
    angularRoute = require('angular-route'),
    browser = require('./modules/browser/module.js'),
    dropped = require('./modules/dropped/module.js'),
    fileReceivingService = require('./services/file-receiving.js'),
    fileSendingService = require('./services/file-sending.js'),
    generators = require('./modules/generators/module.js'),
    instruments = require('./modules/instruments/module.js'),
    peerConnectingService = require('./services/peer-connecting.js'),
    readFileSync = require('fs').readFileSync,
    registry = require('./modules/registry/module.js'),
    renderingService = require('./services/rendering.js'),
    slot = require('./modules/slot/module.js');

module.exports = angular
    .module('client', [
        angularRoute,
        browser.name,
        dropped.name,
        generators.name,
        instruments.name,
        registry.name,
        slot.name
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
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

    .service('fileReceivingService', [fileReceivingService])
    .service('fileSendingService', [fileSendingService])
    .service('peerConnectingService', [peerConnectingService])
    .service('renderingService', ['fileReceivingService', 'fileSendingService', renderingService]);
