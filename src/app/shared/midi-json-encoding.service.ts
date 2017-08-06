import { Injectable } from '@angular/core';
import { encode } from 'json-midi-encoder';
import { IMidiFile } from 'midi-json-parser-worker';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { MidiJsonBpmService } from './midi-json-bpm.service';

@Injectable()
export class MidiJsonEncodingService {

    constructor (private _midiJsonBpmService: MidiJsonBpmService) { }

    public encode (midiJson: IMidiFile, bpm: number) {
        return Observable.create((observer: Observer<ArrayBuffer>) => {
            encode(this._midiJsonBpmService.write(midiJson, bpm))
                .then((midiFile) => {
                    observer.next(midiFile);
                    observer.complete();
                })
                .catch((err) => observer.error(err));
        });
    }

}
