import { Inject, Injectable } from '@angular/core';
import { IDataChannel } from 'rxjs-broker';
import { Observable } from 'rxjs/Observable';
import { IDataChannelEvent } from '../interfaces';
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

    private _window;

    constructor (windowService: WindowService) {
        this._window = windowService.nativeWindow;
    }

    /**
     * This property is true if the browser supports all the required APIs to use the
     * PeerConnectingService.
     */
    get isSupported () {
        if ('RTCPeerConnection' in this._window) {
            const peerConnection = new RTCPeerConnection({
                iceServers: [ { urls: 'stun:0' } ]
            });

            return 'createDataChannel' in peerConnection;
        }

        return false;
    }

    public connect (webSocketSubject): Observable<IDataChannel> {
        return Observable.create((observer) => {
            const peerConnection = new RTCPeerConnection({
                iceServers: ICE_SERVERS
            });

            const candidateSubject = webSocketSubject
                .mask({ type: 'candidate' });

            const descriptionSubject = webSocketSubject
                .mask({ type: 'description' });

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

                            descriptionSubject.send({ description: answer });
                        })
                        .catch(() => {
                            // @todo Handle this error and maybe create another answer.
                        });
                });

            peerConnection.addEventListener('datachannel', ({ channel }: IDataChannelEvent) => {
                candidateSubjectSubscription.unsubscribe();
                descriptionSubjectSubscription.unsubscribe();

                observer.next(channel);
            });

            peerConnection.addEventListener('icecandidate', ({ candidate }) => {
                if (candidate) {
                    candidateSubject.send({ candidate });
                }
            });

            webSocketSubject.next({ type: 'request' });
        });
    }

}
