import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { fetchInstruments } from '../store/actions';
import { IAppState, IInstrument } from '../store/interfaces';
import { selectInstruments, selectIsFetchingInstruments } from '../store/selectors';

@Component({
    styleUrls: [ './remote-registry.component.css' ],
    templateUrl: './remote-registry.component.html'
})
export class RemoteRegistryComponent implements OnInit {

    public hasAvailableInstruments$: Observable<boolean>;

    public instruments$: Observable<IInstrument[]>;

    public setIsFetchingInstruments$: Observable<boolean>;

    constructor (
        private _store: Store<IAppState>
    ) { }

    public ngOnInit () {
        this._store.dispatch(fetchInstruments());

        this.instruments$ = this._store
            .pipe(
                select(selectInstruments),
                map((instruments) => instruments.filter((instrument) => instrument.isAvailable))
            );

        this.hasAvailableInstruments$ = this.instruments$
            .pipe(
                map((instruments) => (instruments.length > 0))
            );

        this.setIsFetchingInstruments$ = this._store
            .pipe(
                select(selectIsFetchingInstruments)
            );
    }

    public refresh () {
        this._store.dispatch(fetchInstruments());
    }

}
