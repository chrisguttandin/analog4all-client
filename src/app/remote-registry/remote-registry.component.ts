import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TAppState, TInstrument, createInstrumentsSelector, createIsFetchingInstrumentsSelector, fetchInstruments } from '../store';

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
    styleUrls: ['./remote-registry.component.scss'],
    templateUrl: './remote-registry.component.html'
})
export class RemoteRegistryComponent implements OnInit {
    public hasAvailableInstruments$!: Observable<boolean>;

    public instruments$!: Observable<TInstrument[]>;

    public setIsFetchingInstruments$!: Observable<boolean>;

    constructor(private _store: Store<TAppState>) {}

    public ngOnInit(): void {
        this._store.dispatch(fetchInstruments());

        this.instruments$ = createInstrumentsSelector(this._store).pipe(
            map((instruments) => instruments.filter((instrument) => instrument.isAvailable))
        );

        this.hasAvailableInstruments$ = this.instruments$.pipe(map((instruments) => instruments.length > 0));

        this.setIsFetchingInstruments$ = createIsFetchingInstrumentsSelector(this._store);
    }

    public refresh(): void {
        this._store.dispatch(fetchInstruments());
    }
}
