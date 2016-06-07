import { GeneratorsServiceProvider } from './providers/generators';
import { PeerConnectingService } from './services/peer-connecting';
import angular from 'angular';

export default angular
    .module('generators', [])

    .provider('generatorsService', GeneratorsServiceProvider)

    .service('peerConnectingService', [ PeerConnectingService ]);
