import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { IInstrument } from '../../interfaces';
import { ENDPOINT } from '../../shared/endpoint-token';
import { fetchInstrumentsFail, fetchInstrumentsSuccess } from '../actions';
import { IFetchInstrumentsFailAction, IFetchInstrumentsSuccessAction } from '../interfaces';

@Injectable()
export class InstrumentsService {

    constructor (
        @Inject(ENDPOINT) private _endpoint: string,
        private _httpClient: HttpClient
    ) { }

    public fetch (): Observable<IFetchInstrumentsFailAction | IFetchInstrumentsSuccessAction> {
        return this._httpClient
            .get<IInstrument[]>(`https${ this._endpoint }instruments`)
            .pipe(
                map((instruments) => fetchInstrumentsSuccess(instruments)),
                catchError(() => of(fetchInstrumentsFail()))
            );
    }

}
