import { GeneratorsService } from './services/generators';
import { PeerConnectingService } from './services/peer-connecting';
import angular from 'angular';

export default angular
    .module('generators', [])

    .service('generatorsService', GeneratorsService)
    .service('peerConnectingService', [ PeerConnectingService ]);
