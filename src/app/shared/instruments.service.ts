import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IInstrument } from '../interfaces';
import { IAppState, UPDATE_INSTRUMENT, UPDATE_INSTRUMENTS } from '../store';
import { ENDPOINT } from './endpoint-token';
import { ResponseError } from './response-error';

@Injectable()
export class InstrumentsService {

    constructor (
        @Inject(ENDPOINT) private _endpoint,
        private _http: Http,
        private _store: Store<IAppState>
    ) { }

    public fetch (): Observable<IInstrument[]> {
        return this._http
            .get(`https${ this._endpoint }instruments/`)
            .map((response) => response.json())
            .do((instruments) => this._store.dispatch({ payload: instruments, type: UPDATE_INSTRUMENTS }))
            .catch((response) => Observable.throw(new ResponseError(response)));
    }

    public get (id: string): Observable<IInstrument> {
        return this._http
            .get(`https${ this._endpoint }instruments/${ id }`)
            .map((response) => response.json())
            .do((instrument) => this._store.dispatch({ payload: instrument, type: UPDATE_INSTRUMENT }))
            .catch((response) => Observable.throw(new ResponseError(response)));
    }

    public select (id: string): Observable<IInstrument> {
        return this._store
            .select('instruments')
            .map((instruments: IInstrument[]) => instruments.find(({ id: d }) => id === d))
            .map((instrument) => (instrument === undefined) ? null : instrument);
    }

    public watch (): Observable<IInstrument[]> {
        return <Observable<IInstrument[]>> this._store.select('instruments');
    }

}
