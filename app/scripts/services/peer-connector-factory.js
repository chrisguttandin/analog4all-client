'use strict';

var EventEmitter = require('events').EventEmitter;

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

class PeerConnector extends EventEmitter {

    constructor (options) {
        var peerConnection = new webkitRTCPeerConnection({
                iceServers: ICE_SERVERS
            });

        super();

        this._channelBroker = options.channelBroker;
        this._peerConnection = peerConnection;

        peerConnection.ondatachannel = (event) => {
            var dataChannel = event.channel;

            // @todo MDN says it's open right away (https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/readyState)
            dataChannel.onopen = () => {
                this.emit('done', null, dataChannel);
            };
        };

        peerConnection.onicecandidate = (event) => {
            var candidate = event.candidate;

            if (candidate) {
                this._channelBroker.send({
                    candidate: candidate.toJSON(),
                    type: 'candidate'
                });
            }
        };

        // @todo wait unit the socket is open
        this._channelBroker.send({
            type: 'request'
        });
    }

    _createLocalDescription () {
        this._peerConnection.createAnswer(::this._setLocalDescription, ::this.fail);
    }

    async fail (err) {
        // @todo close the peerConnection

        throw err;
    }

    async handle (message) {
        if (message.type === 'candidate') {
            let candidate = new RTCIceCandidate(message.candidate);

            this._peerConnection.addIceCandidate(candidate, function () {}, function (err) {
                // shit happens
            });
        } else if (message.type === 'description') {
            let description = new RTCSessionDescription(message.description);

            this._peerConnection.setRemoteDescription(description);
            this._createLocalDescription();
        } else {
            throw new Error();
        }
    }

    _setLocalDescription (description) {
        this._peerConnection.setLocalDescription(description);

        this._channelBroker.send({
            description: description.toJSON(),
            type: 'description'
        });
    }

}

class PeerConnectorFactoryService {

    create (options) {
        return new PeerConnector(options);
    }

}

module.exports = PeerConnectorFactoryService;
