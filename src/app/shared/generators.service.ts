import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IDataChannel, connect, isSupported } from 'rxjs-broker';
import { Observable } from 'rxjs/Observable';
import { catchError, first, map, tap } from 'rxjs/operators';
import { IGenerator } from '../interfaces';
import { ENDPOINT } from './endpoint-token';
import { PeerConnectingService } from './peer-connecting.service';
import { ResponseError } from './response-error';

@Injectable()
export class GeneratorsService {

    constructor (
        @Inject(ENDPOINT) private _endpoint: string,
        private _httpClient: HttpClient,
        private _peerConnectingService: PeerConnectingService
    ) { }

    get isSupported () {
        return isSupported;
    }

    public connect ({ socket: { url } }: IGenerator): Observable<IDataChannel> {
        const webSocketSubject = connect(url);

        return this._peerConnectingService
            .connect(webSocketSubject)
            .pipe(
                first(),
                tap(() => webSocketSubject.close())
            );
    }

    public create (generator: { instrument: { id: string } }): Observable<IGenerator> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._httpClient
            .post(`https${ this._endpoint }instruments/${ generator.instrument.id }/generators`, JSON.stringify(generator), { headers })
            .pipe(
                map((gnrtr) => ({ ...gnrtr, instrument: { id: generator.instrument.id } })),
                catchError((response) => Observable.throw(new ResponseError(response)))
            );
    }

    public delete (generator: IGenerator): Observable<null> {
        return this._httpClient
            .delete(`https${ this._endpoint }instruments/${ generator.instrument.id }/generators/${ generator.id }`)
            .pipe(
                map(() => null),
                catchError((response) => Observable.throw(new ResponseError(response)))
            );
    }

}
