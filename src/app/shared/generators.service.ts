import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { connect, isSupported } from 'rxjs-broker';
import { Observable } from 'rxjs/Observable';
import { IGenerator } from '../interfaces';
import { IAppState } from '../store';
import { ENDPOINT } from './endpoint-token';
import { PeerConnectingService } from './peer-connecting.service';
import { ResponseError } from './response-error';

@Injectable()
export class GeneratorsService {

    constructor (
        @Inject(ENDPOINT) private _endpoint,
        private _http: Http,
        private _peerConnectingService: PeerConnectingService,
        private _store: Store<IAppState>
    ) { }

    get isSupported () {
        return isSupported;
    }

    public connect ({ id, instrument: { id: instrumentId } }: IGenerator): Observable<RTCDataChannel> {
        const webSocketSubject = connect(`wss${ this._endpoint }instruments/${ instrumentId }/generators/${ id }`);

        return this._peerConnectingService
            .connect(webSocketSubject)
            .take(1)
            .do(() => webSocketSubject.close());
    }

    public create (generator): Observable<IGenerator> {
        const headers = new Headers();

        headers.set('Content-Type', 'application/json');

        return this._http
            .post(`https${ this._endpoint }instruments/${ generator.instrument.id }/generators`, JSON.stringify(generator), { headers })
            .map((response) => response.json())
            .catch((response) => Observable.throw(new ResponseError(response)));
    }

    public delete (generator: IGenerator): Observable<null> {
        return this._http
            .delete(`https${ this._endpoint }instruments/${ generator.instrument.id }/generators/${ generator.id }`)
            .map(() => null)
            .catch((response) => Observable.throw(new ResponseError(response)));
    }

}
