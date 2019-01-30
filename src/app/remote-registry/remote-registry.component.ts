import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fetchInstruments } from '../store/actions';
import { IAppState, IInstrument } from '../store/interfaces';
import { createInstrumentsSelector, createIsFetchingInstrumentsSelector } from '../store/selectors';

@Component({
    styleUrls: [ './remote-registry.component.css' ],
    templateUrl: './remote-registry.component.html'
})
export class RemoteRegistryComponent implements OnInit {

    public hasAvailableInstruments$!: Observable<boolean>;

    public instruments$!: Observable<IInstrument[]>;

    public setIsFetchingInstruments$!: Observable<boolean>;

    constructor (
        private _store: Store<IAppState>
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
