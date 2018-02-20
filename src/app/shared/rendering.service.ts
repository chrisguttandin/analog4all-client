import { Injectable } from '@angular/core';
import { IMidiFile } from 'midi-json-parser-worker';
import { wrap } from 'rxjs-broker';
import { map, mergeMap, tap } from 'rxjs/operators';
import { IInstrument } from '../store/interfaces';
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

    public render (instrument: IInstrument, bpm: number, filename: string, midiJson: IMidiFile) {
        return this._generatorsService
            .create({ instrument: { id: instrument.id } })
            .pipe(
                mergeMap(
                    (generator) => this._generatorsService.connect(generator),
                    (generator, dataChannel) => ({ dataChannel, generator })
                ),
                map(({ dataChannel, generator }) => ({ dataChannelSubject: wrap(dataChannel), generator })),
                mergeMap(
                    ({ dataChannelSubject }) => this._waitingService.wait(dataChannelSubject),
                    ({ dataChannelSubject, generator }) => ({ dataChannelSubject, generator })
                ),
                mergeMap(
                    () => this._midiJsonEncodingService.encode(midiJson, bpm),
                    ({ dataChannelSubject, generator }, midiFile) => ({ dataChannelSubject, generator, midiFile })
                ),
                mergeMap(
                    ({ dataChannelSubject, midiFile }) => this._fileSendingService.send(<any> dataChannelSubject, new File([ <any> midiFile ], filename, { type: 'audio/midi' })),
                    ({ dataChannelSubject, generator }) => ({ dataChannelSubject, generator })
                ),
                mergeMap(
                    ({ dataChannelSubject }) => this._fileReceivingService.receive(<any> dataChannelSubject),
                    ({ generator }, arrayBuffer) => ({ arrayBuffer, generator })
                ),
                tap(({ arrayBuffer }) => this._downloadingService.download(filename.replace(/\.[a-z][a-z0-9]+$/i, '.wav'), arrayBuffer)),
                mergeMap(
                    ({ generator }) => this._generatorsService.delete(generator),
                    () => null
                )
            );
    }

}
