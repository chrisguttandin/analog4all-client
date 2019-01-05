import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { IDataChannel, IMaskableSubject, TStringifyableJsonValue } from 'rxjs-broker';
import { ICandidateSubjectEvent, IDataChannelEvent, IDescriptionSubjectEvent } from '../interfaces';
import { WindowService } from './window.service';

const ICE_SERVERS = [ { urls: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302'
] } ];

@Injectable()
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

    public connect (webSocketSubject: IMaskableSubject<TStringifyableJsonValue>): Observable<IDataChannel> {
        return new Observable((observer: Observer<IDataChannel>) => {
            const peerConnection = new RTCPeerConnection({
                iceServers: ICE_SERVERS
            });

            const candidateSubject = webSocketSubject
                .mask<ICandidateSubjectEvent>({ type: 'candidate' });

            const descriptionSubject = webSocketSubject
                .mask<IDescriptionSubjectEvent>({ type: 'description' });

            const candidateSubjectSubscription = candidateSubject
                .subscribe(({ candidate }) => peerConnection
                    // @todo Remove casting again when possible.
                    .addIceCandidate(new RTCIceCandidate(<any> candidate))
                    .catch(() => {
                        // Errors can be ignored.
                    }));

            const descriptionSubjectSubscription = descriptionSubject
                .subscribe(({ description }) => {
                    peerConnection
                        // @todo Remove casting again when possible.
                        .setRemoteDescription(new RTCSessionDescription(<any> description))
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
                            descriptionSubject.send(<any> { description: answer });
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
                    candidateSubject.send(<any> { candidate });
                }
            });

            webSocketSubject.next({ type: 'request' });
        });
    }

}
