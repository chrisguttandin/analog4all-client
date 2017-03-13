import { Injectable } from '@angular/core';
import { wrap } from 'rxjs-broker';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/zip';
import { Observable } from 'rxjs/Observable';
import { DownloadingService } from './downloading.service';
import { FileReceivingService } from './file-receiving.service';
import { FileSendingService } from './file-sending.service';
import { GeneratorsService } from './generators.service';
import { MidiJsonEncodingService } from './midi-json-encoding.service';
import { WaitingService } from './waiting.service';

@Injectable()
export class RenderingService {

    constructor (
        private _downloadingService: DownloadingService,
        private _fileReceivingService: FileReceivingService,
        private _fileSendingService: FileSendingService,
        private _generatorsService: GeneratorsService,
        private _midiJsonEncodingService: MidiJsonEncodingService,
        private _waitingService: WaitingService
    ) { }

    public render (instrument, bpm, filename, midiJson) {
        return this._generatorsService
            .create({ instrument: { id: instrument.id } })
            .mergeMap((generator) => Observable
                .of({ generator })
                .zip(this._generatorsService.connect(generator)))
            .map(([ { generator }, dataChannel ]) => ({ dataChannelSubject: wrap(dataChannel), generator }))
            .mergeMap(({ dataChannelSubject, generator }) => Observable
                .of({ dataChannelSubject, generator })
                .zip(this._waitingService.wait(dataChannelSubject)))
            .mergeMap(([ { dataChannelSubject, generator } ]) => Observable
                .of({ dataChannelSubject, generator })
                .zip(this._midiJsonEncodingService.encode(midiJson, bpm)))
            .mergeMap(([ { dataChannelSubject, generator }, midiFile ]) => Observable
                .of({ dataChannelSubject, generator })
                .zip(this._fileSendingService.send(dataChannelSubject, new File([ midiFile ], filename, { type: 'audio/midi' }))))
            .mergeMap(([ { dataChannelSubject, generator } ]) => Observable
                .of({ dataChannelSubject, generator })
                .zip(this._fileReceivingService.receive(dataChannelSubject)))
            .do(([ , arrayBuffer ]) => this._downloadingService.download(filename.replace(/\.[a-z][a-z0-9]+$/i, '.wav'), arrayBuffer))
            .mergeMap(([ { dataChannelSubject, generator } ]) => Observable
                .of({ dataChannelSubject })
                .zip(this._generatorsService.delete(generator)));
    }

}
