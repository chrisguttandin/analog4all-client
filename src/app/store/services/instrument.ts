import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActionType } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ENDPOINT } from '../../shared/endpoint-token';
import { fetchInstrumentFail, fetchInstrumentSuccess } from '../actions';
import { TInstrument } from '../types';

@Injectable({
    providedIn: 'root'
})
export class InstrumentService {
    constructor(@Inject(ENDPOINT) private _endpoint: string, private _httpClient: HttpClient) {}

    public fetch(id: TInstrument['id']): Observable<ActionType<typeof fetchInstrumentFail | typeof fetchInstrumentSuccess>> {
        return this._httpClient.get<TInstrument>(`https${this._endpoint}instruments/${id}`).pipe(
            map(fetchInstrumentSuccess),
            catchError(() => of(fetchInstrumentFail(id)))
        );
    }
}
