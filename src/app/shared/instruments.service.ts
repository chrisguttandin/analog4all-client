import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { IInstrument } from '../interfaces';
import { updateInstruments } from '../store/actions';
import { IAppState } from '../store/interfaces';
import { createInstrumentByIdSelector, selectInstruments } from '../store/selectors';
import { ENDPOINT } from './endpoint-token';
import { ResponseError } from './response-error';

@Injectable()
export class InstrumentsService {

    constructor (
        @Inject(ENDPOINT) private _endpoint: string,
        private _httpClient: HttpClient,
        private _store: Store<IAppState>
    ) { }

    public fetch (): Observable<IInstrument[]> {
        return this._httpClient
            .get<IInstrument[]>(`https${ this._endpoint }instruments/`)
            .pipe(
                tap((instruments) => this._store.dispatch(updateInstruments(instruments))),
                catchError((response) => Observable.throw(new ResponseError(response)))
            );
    }

    public select (id: string): Observable<null | IInstrument> {
        return this._store
            .pipe(
                select(createInstrumentByIdSelector(id))
            );
    }

    public watch (): Observable<IInstrument[]> {
        return this._store
            .pipe(
                select(selectInstruments)
            );
    }

}
