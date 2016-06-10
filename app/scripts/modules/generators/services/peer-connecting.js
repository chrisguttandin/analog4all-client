/* eslint-disable indent */
const ICE_SERVERS = [ { urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302'
      ] } ];
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
                        peerConnection
                            .addIceCandidate(new RTCIceCandidate(candidate))
                            .catch(() => {
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
                        peerConnection
                            .setRemoteDescription(new RTCSessionDescription(description))
                            .catch(() => {
                                // shit happens
                            });
                        peerConnection
                            .createAnswer()
                            .then((description) => {
                                peerConnection
                                    .setLocalDescription(description)
                                    .catch(() => {
                                        // shit happens
                                    });

                                descriptionChannel.send({ description: description.toJSON() });
                            })
                            .catch(() => {
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
