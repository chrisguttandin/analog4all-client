'use strict';

module.exports = function () {

    class ReceivingService {

        receive (byteLength, channel) {
            return new Promise((resolve, reject) => {
                var arrayBuffer = new ArrayBuffer(byteLength),
                    byteIndex = 0;

                channel.onmessage = function (event) {
                    if (event.data instanceof ArrayBuffer) {
                        let destination = new Uint8Array(arrayBuffer),
                            source = new Uint8Array(event.data);

                        for (let i = byteIndex, length = byteIndex + event.data.byteLength; i < length; i += 1) {
                            destination[i] = source[i - byteIndex];
                        }

                        byteIndex += event.data.byteLength;
                    } else {
                        try {
                            let data = JSON.parse(event.data);

                            if (data.type === 'eof') {
                                channel.onmessage = null;

                                resolve(arrayBuffer);
                            } else {
                                console.log('unknown event', event);
                            }
                        } catch (err) {
                            // @todo
                        }
                    }
                }
            })
        }

    }

    return new ReceivingService();
}
