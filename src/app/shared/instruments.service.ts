import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { IInstrument } from '../interfaces';
import { IAppState } from '../store';
import { UPDATE_INSTRUMENT, UPDATE_INSTRUMENTS } from '../store/actions';
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
            .get(`https${ this._endpoint }instruments/`)
            .pipe(
                tap((instruments) => this._store.dispatch({ payload: instruments, type: UPDATE_INSTRUMENTS })),
                catchError((response) => Observable.throw(new ResponseError(response)))
            );
    }

    public get (id: string): Observable<IInstrument> {
        return this._httpClient
            .get(`https${ this._endpoint }instruments/${ id }`)
            .pipe(
                tap((instrument) => this._store.dispatch({ payload: instrument, type: UPDATE_INSTRUMENT })),
                catchError((response) => Observable.throw(new ResponseError(response)))
            );
    }

    public select (id: string): Observable<null | IInstrument> {
        return this._store
            .select('instruments')
            .pipe(
                map<IInstrument[], undefined | IInstrument>((instruments) => instruments.find(({ id: d }) => id === d)),
                map<undefined | IInstrument, null | IInstrument>((instrument) => (instrument === undefined) ? null : instrument)
            );
    }

    public watch (): Observable<IInstrument[]> {
        return <Observable<IInstrument[]>> this._store.select('instruments');
    }

}
