import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ENDPOINT } from '../../shared/endpoint-token';
import { fetchInstrumentFail, fetchInstrumentSuccess } from '../actions';
import { IFetchInstrumentFailAction, IFetchInstrumentSuccessAction } from '../interfaces';
import { TInstrument } from '../types';

@Injectable({
    providedIn: 'root'
})
export class InstrumentService {
    constructor(@Inject(ENDPOINT) private _endpoint: string, private _httpClient: HttpClient) {}

    public fetch(id: TInstrument['id']): Observable<IFetchInstrumentFailAction | IFetchInstrumentSuccessAction> {
        return this._httpClient.get<TInstrument>(`https${this._endpoint}instruments/${id}`).pipe(
            map(fetchInstrumentSuccess),
            catchError(() => of(fetchInstrumentFail(id)))
        );
    }
}
