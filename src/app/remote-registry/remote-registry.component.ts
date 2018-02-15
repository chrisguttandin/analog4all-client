import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { IInstrument } from '../interfaces';
import { InstrumentsService } from '../shared';
import { IAppState } from '../store/interfaces';
import { selectInstruments } from '../store/selectors';

@Component({
    styleUrls: [ './remote-registry.component.css' ],
    templateUrl: './remote-registry.component.html'
})
export class RemoteRegistryComponent implements OnDestroy, OnInit {

    public instruments$: Observable<IInstrument[]>;

    public numberOfInstruments$: Observable<number>;

    private _refreshments$: BehaviorSubject<null>;

    private _refreshmentsSubscription: Subscription;

    constructor (
        private _instrumentsService: InstrumentsService,
        private _store: Store<IAppState>
    ) {
        this._refreshments$ = new BehaviorSubject(null);
    }

    public ngOnDestroy () {
        this._refreshmentsSubscription.unsubscribe();
    }

    public ngOnInit () {
        this.instruments$ = this._store
            .pipe(
                select(selectInstruments),
                map((instruments) => instruments.filter((instrument) => instrument.isAvailable))
            );

        this.numberOfInstruments$ = this.instruments$
            .pipe(
                map((instruments) => instruments.length)
            );

        this._refreshmentsSubscription = this._refreshments$
            .pipe(
                switchMap(() => this._instrumentsService.fetch())
            )
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
