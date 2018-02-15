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

    public instruments$: Observable<IInstrument[]>;

    public setIsFetchingInstruments$: Observable<boolean>;

    public numberOfInstruments$: Observable<number>;

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

        this.setIsFetchingInstruments$ = this._store
            .pipe(
                select(selectIsFetchingInstruments)
            );

        this.numberOfInstruments$ = this.instruments$
            .pipe(
                map((instruments) => instruments.length)
            );
    }

    public refresh () {
        this._store.dispatch(fetchInstruments());
    }

}
