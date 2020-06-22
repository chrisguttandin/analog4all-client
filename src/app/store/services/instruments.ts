import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ENDPOINT } from '../../shared/endpoint-token';
import { fetchInstrumentsFail, fetchInstrumentsSuccess } from '../actions';
import { IFetchInstrumentsFailAction, IFetchInstrumentsSuccessAction } from '../interfaces';
import { TInstrument } from '../types';

@Injectable({
    providedIn: 'root'
})
export class InstrumentsService {
    constructor(@Inject(ENDPOINT) private _endpoint: string, private _httpClient: HttpClient) {}

    public fetch(): Observable<IFetchInstrumentsFailAction | IFetchInstrumentsSuccessAction> {
        return this._httpClient.get<TInstrument[]>(`https${this._endpoint}instruments`).pipe(
            map((instruments) => fetchInstrumentsSuccess(instruments)),
            catchError(() => of(fetchInstrumentsFail()))
        );
    }
}
