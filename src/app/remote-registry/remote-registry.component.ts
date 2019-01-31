import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TAppState, TInstrument, createInstrumentsSelector, createIsFetchingInstrumentsSelector, fetchInstruments } from '../store';

@Component({
    styleUrls: [ './remote-registry.component.css' ],
    templateUrl: './remote-registry.component.html'
})
export class RemoteRegistryComponent implements OnInit {

    public hasAvailableInstruments$!: Observable<boolean>;

    public instruments$!: Observable<TInstrument[]>;

    public setIsFetchingInstruments$!: Observable<boolean>;

    constructor (
        private _store: Store<TAppState>
    ) { }

    public ngOnInit (): void {
        this._store.dispatch(fetchInstruments());

        this.instruments$ = createInstrumentsSelector(this._store)
            .pipe(
                map((instruments) => instruments.filter((instrument) => instrument.isAvailable))
            );

        this.hasAvailableInstruments$ = this.instruments$
            .pipe(
                map((instruments) => (instruments.length > 0))
            );

        this.setIsFetchingInstruments$ = createIsFetchingInstrumentsSelector(this._store);
    }

    public refresh (): void {
        this._store.dispatch(fetchInstruments());
    }

}
