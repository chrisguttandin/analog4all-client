import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WindowService } from './window.service';

const ICE_SERVERS = [ { urls: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302'
] } ];

// @todo Remove this again when Chrome supports the unprefixed RTCPeerConnection.
declare var webkitRTCPeerConnection: RTCPeerConnectionStatic;

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
        if ('webkitRTCPeerConnection' in this._window) {
            const peerConnection = new webkitRTCPeerConnection({
                iceServers: [ { urls: 'stun:0' } ]
            });

            return 'createDataChannel' in peerConnection;
        }

        return false;
    }

    public connect (webSocketSubject): Observable<RTCDataChannel> {
        return Observable.create((observer) => {
            const peerConnection = new webkitRTCPeerConnection({
                iceServers: ICE_SERVERS
            });

            const candidateChannel = webSocketSubject
                .mask({ type: 'candidate' });

            const descriptionChannel = webSocketSubject
                .mask({ type: 'description' });

            const candidateChannelSubscription = candidateChannel
                .subscribe(({ candidate }) => peerConnection
                    .addIceCandidate(new RTCIceCandidate(candidate))
                    .catch(() => {
                        // Errors can be ignored.
                    }));

            const descriptionChannelSubscription = descriptionChannel
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

                                descriptionChannel.send({ description: answer });
                        })
                        .catch(() => {
                            // @todo Handle this error and maybe create another answer.
                        });
                });

            peerConnection.ondatachannel = ({ channel }) => {
                candidateChannelSubscription.unsubscribe();
                descriptionChannelSubscription.unsubscribe();

                observer.next(channel);
            };

            peerConnection.onicecandidate = ({ candidate }) => {
                if (candidate) {
                    candidateChannel.send({ candidate });
                }
            };

            webSocketSubject.next({ type: 'request' });
        });
    }

}
