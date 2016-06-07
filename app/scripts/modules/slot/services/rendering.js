import Recorder from 'recorderjs';

export class RenderingService {

    constructor (fileReceivingService, fileSendingService, waitingService) {
        this._fileReceivingService = fileReceivingService;
        this._fileSendingService = fileSendingService;
        this._waitingService = waitingService;
    }

    async render (dataChannelSubject, midiFile) {
        await this._waitingService.wait(dataChannelSubject);

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
