/* eslint-disable indent */
const ICE_SERVERS = [{
          url: 'stun:stun.l.google.com:19302'
      }, {
          url: 'stun:stun1.l.google.com:19302'
      }, {
          url: 'stun:stun2.l.google.com:19302'
      }, {
          url: 'stun:stun3.l.google.com:19302'
      }, {
          url: 'stun:stun4.l.google.com:19302'
      }];
/* eslint-enable indent */

export class PeerConnectingService {

    connect (webSocketSubject) {
        return new Promise((resolve, reject) => {
            var candidateChannel,
                candidateChannelSubscription,
                descriptionChannel,
                descriptionChannelSubscription,
                peerConnection;

            peerConnection = new webkitRTCPeerConnection({ // eslint-disable-line new-cap, no-undef
                iceServers: ICE_SERVERS
            });

            candidateChannel = webSocketSubject
                .mask({ type: 'candidate' });

            descriptionChannel = webSocketSubject
                .mask({ type: 'description' });

            candidateChannelSubscription = candidateChannel
                .subscribe({
                    complete () {
                        reject();
                    },
                    error (err) {
                        reject(err);
                    },
                    next ({ candidate }) {
                        peerConnection.addIceCandidate(new RTCIceCandidate(candidate), () => {}, () => {
                            // shit happens
                        });
                    }
                });

            descriptionChannelSubscription = descriptionChannel
                .subscribe({
                    complete () {
                        reject();
                    },
                    error (err) {
                        reject(err);
                    },
                    next ({ description }) {
                        peerConnection.setRemoteDescription(new RTCSessionDescription(description));
                        peerConnection.createAnswer((description) => {
                            peerConnection.setLocalDescription(description);

                            descriptionChannel.send({ description: description.toJSON() });
                        }, () => {
                            // shit happens
                        });
                    }
                });

            peerConnection.ondatachannel = ({ channel }) => {
                candidateChannelSubscription.unsubscribe();
                descriptionChannelSubscription.unsubscribe();

                resolve(channel);
            };

            peerConnection.onicecandidate = ({ candidate }) => {
                if (candidate) {
                    candidateChannel.send({ candidate: candidate.toJSON() });
                }
            };

            webSocketSubject.next({ type: 'request' });
        });
    }

}
