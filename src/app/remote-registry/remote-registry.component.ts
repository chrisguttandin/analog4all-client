import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TAppState, TInstrument } from '../store';
// @todo Import the actions via the barrel file again if it doesn't affect the tree-shaking anymore.
import { fetchInstruments } from '../store/actions';
// @todo Import the selectors via the barrel file again if it doesn't affect the tree-shaking anymore.
import { createInstrumentsSelector, createIsFetchingInstrumentsSelector } from '../store/selectors';

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
