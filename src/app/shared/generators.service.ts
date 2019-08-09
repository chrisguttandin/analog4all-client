import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { connect, isSupported } from 'rxjs-broker';
import { catchError, first, map, tap } from 'rxjs/operators';
import { IClientEvent, IGenerator } from '../interfaces';
import { ENDPOINT } from './endpoint-token';
import { PeerConnectingService } from './peer-connecting.service';
import { ResponseError } from './response-error';

@Injectable({
    providedIn: 'root'
})
export class GeneratorsService {

    constructor (
        @Inject(ENDPOINT) private _endpoint: string,
        private _httpClient: HttpClient,
        private _peerConnectingService: PeerConnectingService
    ) { }

    get isSupported (): boolean {
        return isSupported;
    }

    public connect ({ socket: { url } }: IGenerator): Observable<RTCDataChannel> {
        const webSocketSubject = connect<IClientEvent['message']>(url); // tslint:disable-line:no-null-undefined-union

        return this._peerConnectingService
            .connect(webSocketSubject)
            .pipe(
                first(),
                tap(() => webSocketSubject.close())
            );
    }

    public create (generator: { instrument: { id: string } }): Observable<IGenerator> {
        return this._httpClient
            .post<IGenerator>(`https${ this._endpoint }instruments/${ generator.instrument.id }/generators`, generator)
            .pipe(
                map((gnrtr) => ({ ...gnrtr, instrument: { id: generator.instrument.id } })),
                catchError((response) => throwError(new ResponseError(response)))
            );
    }

    public delete (generator: IGenerator): Observable<null> {
        return this._httpClient
            .delete(`https${ this._endpoint }instruments/${ generator.instrument.id }/generators/${ generator.id }`)
            .pipe(
                map(() => null),
                catchError((response) => throwError(new ResponseError(response)))
            );
    }

}
