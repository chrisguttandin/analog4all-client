import { Component } from '@angular/core';
import { GeneratorsService, PeerConnectingService } from './shared';

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
    selector: 'anc-app',
    standalone: false,
    templateUrl: './app.component.html'
})
export class AppComponent {
    public isSupported: boolean;

    constructor(
        private _generatorsService: GeneratorsService,
        private _peerConnectingService: PeerConnectingService
    ) {
        this.isSupported = this._generatorsService.isSupported && this._peerConnectingService.isSupported;
    }
}
