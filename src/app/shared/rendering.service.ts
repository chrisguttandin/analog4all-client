import { Injectable } from '@angular/core';
import { IMidiFile } from 'midi-json-parser-worker';
import { wrap } from 'rxjs-broker';
import { of } from 'rxjs/observable/of';
import { zip } from 'rxjs/observable/zip';
import { map, mergeMap, tap } from 'rxjs/operators';
import { IInstrument } from '../interfaces';
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
                mergeMap((generator) => zip(
                    of({ generator }),
                    this._generatorsService.connect(<any> generator)
                )),
                map(([ { generator }, dataChannel ]) => ({ dataChannelSubject: wrap(dataChannel), generator })),
                mergeMap(({ dataChannelSubject, generator }) => zip(
                    of({ dataChannelSubject, generator }),
                    this._waitingService.wait(dataChannelSubject)
                )),
                mergeMap(([ { dataChannelSubject, generator } ]) => zip(
                    of({ dataChannelSubject, generator }),
                    this._midiJsonEncodingService.encode(midiJson, bpm)
                )),
                mergeMap(([ { dataChannelSubject, generator }, midiFile ]) => zip(
                    of({ dataChannelSubject, generator }),
                    this._fileSendingService.send(dataChannelSubject, new File([ <any> midiFile ], filename, { type: 'audio/midi' }))
                )),
                mergeMap(([ { dataChannelSubject, generator } ]) => zip(
                    of({ dataChannelSubject, generator }),
                    this._fileReceivingService.receive(dataChannelSubject)
                )),
                tap(([ , arrayBuffer ]) => this._downloadingService.download(filename.replace(/\.[a-z][a-z0-9]+$/i, '.wav'), arrayBuffer)),
                mergeMap(([ { dataChannelSubject, generator } ]) => zip(
                    of({ dataChannelSubject }),
                    this._generatorsService.delete(generator)
                ))
            );
    }

}
