'use strict';

class Generators {

    constructor ($http) {
        this._$http = $http;
    }

    connect (generator) {
        return new Promise((resolve, reject) => {
            var peerConnection = new webkitRTCPeerConnection({
                    iceServers: [{
                        url: 'stun:stun.l.google.com:19302'
                    }, {
                        url: 'stun:stun1.l.google.com:19302'
                    }, {
                        url: 'stun:stun2.l.google.com:19302'
                    }, {
                        url: 'stun:stun3.l.google.com:19302'
                    }, {
                        url: 'stun:stun4.l.google.com:19302'
                    }]
                }),
                socket = new WebSocket('ws://analog4all-registry.elasticbeanstalk.com/instruments/' + generator.instrument.id + '/generators/' + generator.id);

            peerConnection.ondatachannel = function (event) {
                var dataChannel = event.channel;

                dataChannel.onopen = function () {
                    socket.close();

                    resolve(dataChannel);
                };
            };

            peerConnection.onicecandidate = function (event) {
                if (event.candidate) {
                    socket.send(JSON.stringify({
                        candidate: event.candidate.toJSON(),
                        type: 'candidate'
                    }));
                }
            };

            socket.addEventListener('error', function (event) {
                console.log('error while establishing a socket connection', event);
            });

            socket.addEventListener('message', function (event) {
                var data = JSON.parse(event.data);

                if (data.type === 'candidate') {
                    peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate, function () {}, function (err) {
                        console.log('error while adding an ICE candidate', err);
                    }));
                } else if (data.type === 'description') {
                    let description = new RTCSessionDescription(data.description);

                    peerConnection.setRemoteDescription(description);

                    peerConnection.createAnswer(function (description) {
                        peerConnection.setLocalDescription(description);

                        socket.send(JSON.stringify({
                            description: description.toJSON(),
                            type: 'description'
                        }));
                    }, function (err) {
                        console.log('error while creating an answer', err);
                    });
                } else {
                    console.log('received message of an unknown type', event);
                }
            });

            socket.addEventListener('open', function () {
                socket.send(JSON.stringify({
                    type: 'request'
                }));
            });
        });
    }

    create (data) {
        return new Promise((resolve, reject) => {
            this._$http
                .post('http://analog4all-registry.elasticbeanstalk.com/instruments/' + data.instrument.id + '/generators')
                .success((data) => resolve(data))
                .error((data, status, headers, config) => {
                    console.log('error while creating a generator', data, status, headers, config);

                    reject();
                });
        });
    }

}

module.exports = Generators;
