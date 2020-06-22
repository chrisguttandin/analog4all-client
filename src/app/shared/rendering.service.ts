import { Injectable } from '@angular/core';
import { IMidiFile } from 'midi-json-parser-worker';
import { Observable } from 'rxjs';
import { wrap } from 'rxjs-broker';
import { map, mergeMap, tap } from 'rxjs/operators';
import { TInstrument } from '../store';
import { DownloadingService } from './downloading.service';
import { FileReceivingService } from './file-receiving.service';
import { FileSendingService } from './file-sending.service';
import { GeneratorsService } from './generators.service';
import { MidiJsonEncodingService } from './midi-json-encoding.service';
import { WaitingService } from './waiting.service';

@Injectable({
    providedIn: 'root'
})
export class RenderingService {
    constructor(
        private _downloadingService: DownloadingService,
        private _fileReceivingService: FileReceivingService,
        private _fileSendingService: FileSendingService,
        private _generatorsService: GeneratorsService,
        private _midiJsonEncodingService: MidiJsonEncodingService,
        private _waitingService: WaitingService
    ) {}

    public render(instrument: TInstrument, bpm: number, filename: string, midiJson: IMidiFile): Observable<null> {
        return this._generatorsService.create({ instrument: { id: instrument.id } }).pipe(
            mergeMap((generator) => this._generatorsService.connect(generator).pipe(map((dataChannel) => ({ dataChannel, generator })))),
            map(({ dataChannel, generator }) => ({ dataChannelSubject: wrap(dataChannel), generator })),
            mergeMap<{ dataChannelSubject: any; generator: any }, Observable<{ dataChannelSubject: any; generator: any }>>(
                ({ dataChannelSubject, generator }) =>
                    this._waitingService.wait(dataChannelSubject).pipe(map(() => ({ dataChannelSubject, generator })))
            ),
            mergeMap(({ dataChannelSubject, generator }) =>
                this._midiJsonEncodingService.encode(midiJson, bpm).pipe(map((midiFile) => ({ dataChannelSubject, generator, midiFile })))
            ),
            mergeMap(({ dataChannelSubject, generator, midiFile }) =>
                this._fileSendingService
                    .send(dataChannelSubject, new File([midiFile], filename, { type: 'audio/midi' }))
                    .pipe(map(() => ({ dataChannelSubject, generator })))
            ),
            mergeMap(({ dataChannelSubject, generator }) =>
                this._fileReceivingService.receive(<any>dataChannelSubject).pipe(map((arrayBuffer) => ({ arrayBuffer, generator })))
            ),
            tap(({ arrayBuffer }) => this._downloadingService.download(filename.replace(/\.[a-z][a-z0-9]+$/i, '.wav'), arrayBuffer)),
            mergeMap(({ generator }) => this._generatorsService.delete(generator).pipe(map(() => null)))
        );
    }
}
