import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { InstrumentsService } from '../shared';

@Component({
    styleUrls: [ './remote-registry.component.css' ],
    templateUrl: './remote-registry.component.html'
})
export class RemoteRegistryComponent implements OnDestroy, OnInit {

    public instruments$;

    public numberOfInstruments$: Observable<number>;

    private _refreshments$: BehaviorSubject<null>;

    private _refreshmentsSubscription: Subscription;

    constructor (private _instrumentsService: InstrumentsService) {
        this._refreshments$ = new BehaviorSubject(null);
    }

    public ngOnDestroy () {
        this._refreshmentsSubscription.unsubscribe();
    }

    public ngOnInit () {
        this.instruments$ = this._instrumentsService.watch()
            .map((instruments) => instruments.filter((instrument) => instrument.isAvailable));

        this.numberOfInstruments$ = this.instruments$
            .map((instruments) => instruments.length);

        this._refreshmentsSubscription = this._refreshments$
            .switchMap(() => this._instrumentsService.fetch())
            .subscribe({
                error () {
                    // @todo Handle errors.
                }
            });
    }

    public refresh () {
        this._refreshments$.next(null);
    }

}
