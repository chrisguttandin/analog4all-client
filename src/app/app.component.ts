import { Component } from '@angular/core';
import { GeneratorsService, PeerConnectingService } from './shared';

@Component({
    selector: 'anc-app',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class AppComponent {
    public isSupported: boolean;

    constructor(private _generatorsService: GeneratorsService, private _peerConnectingService: PeerConnectingService) {
        this.isSupported = this._generatorsService.isSupported && this._peerConnectingService.isSupported;
    }
}
