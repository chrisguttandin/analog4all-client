import { Component, OnInit } from '@angular/core';
import { GeneratorsService, PeerConnectingService } from './shared';

@Component({
    selector: 'anc-root',
    styleUrls: [ './app.component.css' ],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    public isSupported: boolean;

    constructor (
        private _generatorsService: GeneratorsService,
        private _peerConnectingService: PeerConnectingService
    ) { }

    public ngOnInit () {
        this.isSupported = this._generatorsService.isSupported &&
            this._peerConnectingService.isSupported;
    }

}
