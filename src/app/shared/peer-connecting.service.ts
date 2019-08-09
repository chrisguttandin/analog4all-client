import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { IRemoteSubject, mask } from 'rxjs-broker';
import { ICandidateEvent, ICandidateMessage, IClientEvent, IDataChannelEvent, IDescriptionEvent, IDescriptionMessage } from '../interfaces';
import { WindowService } from './window.service';

const ICE_SERVERS = [ { urls: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302'
] } ];

@Injectable({
    providedIn: 'root'
})
export class PeerConnectingService {

    private _window: null | Window;

    constructor (windowService: WindowService) {
        this._window = windowService.nativeWindow;
    }

    /**
     * This property is true if the browser supports all the required APIs to use the
     * PeerConnectingService.
     */
    get isSupported (): boolean {
        if (this._window !== null && 'RTCPeerConnection' in this._window) {
            const peerConnection = new RTCPeerConnection({
                iceServers: [ { urls: 'stun:0' } ]
            });

            return 'createDataChannel' in peerConnection;
        }

        return false;
    }

    public connect (webSocketSubject: IRemoteSubject<IClientEvent['message']>): Observable<RTCDataChannel> { // tslint:disable-line:max-line-length no-null-undefined-union
        return new Observable((observer: Observer<RTCDataChannel>) => {
            const peerConnection = new RTCPeerConnection({
                iceServers: ICE_SERVERS
            });

            const candidateSubject = mask<ICandidateMessage, ICandidateEvent, IClientEvent['message']>(
                { type: 'candidate' },
                webSocketSubject
            );
            const descriptionSubject = mask<IDescriptionMessage, IDescriptionEvent, IClientEvent['message']>(
                { type: 'description' },
                webSocketSubject
            );

            const candidateSubjectSubscription = candidateSubject
                .subscribe(({ candidate }) => peerConnection
                    .addIceCandidate(new RTCIceCandidate(candidate))
                    .catch(() => {
                        // Errors can be ignored.
                    }));

            const descriptionSubjectSubscription = descriptionSubject
                .subscribe(({ description }) => {
                    peerConnection
                        .setRemoteDescription(new RTCSessionDescription(description))
                        .catch(() => {
                            // @todo Handle this error and maybe request another description.
                        });

                    peerConnection
                        .createAnswer()
                        .then((answer) => {
                            peerConnection
                                .setLocalDescription(answer)
                                .catch(() => {
                                    // @todo Handle this error and maybe create another description.
                                });

                            // @todo Remove casting again when possible.
                            descriptionSubject.send(<IDescriptionMessage> { description: answer });
                        })
                        .catch(() => {
                            // @todo Handle this error and maybe create another answer.
                        });
                });

            peerConnection.addEventListener('datachannel', <EventListener> (({ channel }: IDataChannelEvent) => {
                candidateSubjectSubscription.unsubscribe();
                descriptionSubjectSubscription.unsubscribe();

                observer.next(channel);
            }));

            peerConnection.addEventListener('icecandidate', ({ candidate }) => {
                if (candidate !== null) {
                    candidateSubject.send(<ICandidateMessage> { candidate });
                }
            });

            // @todo Remove casting again when possible.
            webSocketSubject.next(<any> { type: 'request' });
        });
    }

}
