var Recorder = require('recorderjs');

class RenderingService {

    constructor (fileReceivingService, fileSendingService) {
        this._fileReceivingService = fileReceivingService;
        this._fileSendingService = fileSendingService;
    }

    async render (dataChannelSubject, midiFile) {
        try {
            await this._fileSendingService.send(dataChannelSubject, midiFile);
        } catch (err) {
            console.log('error while sending', err); // eslint-disable-line no-console

            return;
        }

        try {
            let name = midiFile.name.replace('.mid', '.wav'),
                waveFile = await this._fileReceivingService.receive(dataChannelSubject);

            Recorder.forceDownload(new Blob([waveFile]), name);
        } catch (err) {
            console.log('error while receiving', err); // eslint-disable-line no-console
        }
    }

}

module.exports = RenderingService;
