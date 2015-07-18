'use strict';

var EventEmitter = require('events').EventEmitter,
    Recorder = require('recorderjs');

class RenderingService {

    constructor (receivingService) {
        this._receivingService = receivingService;
    }

    render (file, channel) {
        var fileReader = new FileReader(),
            renderer = new EventEmitter();

        fileReader.onload = () => {
            channel.onmessage = (event) => {
                try {
                    let data = JSON.parse(event.data);

                    if (data.type === 'bof') {
                        renderer.emit('statechange', 'receiving');
                        this._receivingService
                            .receive(data.byteLength, channel)
                            .then((arrayBuffer) => {
                                var blob = new Blob([arrayBuffer]),
                                    name = file.name.replace('.mid', '.wav');

                                Recorder.forceDownload(blob, name);
                                renderer.emit('statechange', 'unknown');
                            });
                    }
                } catch (err) {
                    // shit happens
                }
            };

            channel.send(fileReader.result);
            renderer.emit('statechange', 'sending');
        }

        setTimeout(function () {
            fileReader.readAsArrayBuffer(file);
            renderer.emit('statechange', 'reading');
        });

        return renderer;
    }

}

module.exports = RenderingService;
