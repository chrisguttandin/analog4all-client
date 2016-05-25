var Recorder = require('recorderjs');

class RenderingService {

    constructor (fileReceivingService, fileSendingService) {
        this._fileReceivingService = fileReceivingService;
        this._fileSendingService = fileSendingService;
    }

    async render (midiFile, channelBroker) {

        // renderer.emit('statechange', 'sending');

        try {
            await this._fileSendingService.send(channelBroker, midiFile);
        } catch (err) {
            console.log('error while sending', err); // eslint-disable-line no-console

            return;
        }

        // try {
        //     await monitoringService.monitor(channelBroker);
        // } catch (err) {
        //     // error while processing
        //
        //     return;
        // }

        // renderer.emit('statechange', 'receiving');

        try {
            let name = midiFile.name.replace('.mid', '.wav'),
                waveFile = await this._fileReceivingService.receive(channelBroker);

            Recorder.forceDownload(new Blob([waveFile]), name);
        } catch (err) {
            console.log('error while receiving', err); // eslint-disable-line no-console
        }

        // renderer.emit('statechange', 'unknown');
    }

}

module.exports = RenderingService;
