import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { IInstrument } from '../interfaces';
import { fetchInstruments } from '../store/actions';
import { IAppState } from '../store/interfaces';
import { selectInstruments } from '../store/selectors';

@Component({
    styleUrls: [ './remote-registry.component.css' ],
    templateUrl: './remote-registry.component.html'
})
export class RemoteRegistryComponent implements OnInit {

    public instruments$: Observable<IInstrument[]>;

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

        this.numberOfInstruments$ = this.instruments$
            .pipe(
                map((instruments) => instruments.length)
            );
    }

    public refresh () {
        this._store.dispatch(fetchInstruments());
    }

}
