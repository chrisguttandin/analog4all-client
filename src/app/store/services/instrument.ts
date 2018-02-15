import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { ENDPOINT } from '../../shared/endpoint-token';
import { fetchInstrumentFail, fetchInstrumentSuccess } from '../actions';
import { IFetchInstrumentFailAction, IFetchInstrumentSuccessAction, IInstrument } from '../interfaces';

@Injectable()
export class InstrumentService {

    constructor (
        @Inject(ENDPOINT) private _endpoint: string,
        private _httpClient: HttpClient
    ) { }

    public fetch (id: IInstrument['id']): Observable<IFetchInstrumentFailAction | IFetchInstrumentSuccessAction> {
        return this._httpClient
            .get<IInstrument>(`https${ this._endpoint }instruments/${ id }`)
            .pipe(
                map((instrument) => fetchInstrumentSuccess(instrument)),
                catchError(() => of(fetchInstrumentFail(id)))
            );
    }

}
