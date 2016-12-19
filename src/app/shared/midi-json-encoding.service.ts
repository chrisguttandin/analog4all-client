import { Injectable } from '@angular/core';
import { encode } from 'json-midi-encoder';
import { Observable } from 'rxjs';
import { MidiJsonBpmService } from './midi-json-bpm.service';

@Injectable()
export class MidiJsonEncodingService {

    constructor (private _midiJsonBpmService: MidiJsonBpmService) { }

    public encode (midiJson, bpm) {
        return Observable.create((observer) => {
            encode(this._midiJsonBpmService.write(midiJson, bpm))
                .then((midiFile) => {
                    observer.next(midiFile);
                    observer.complete();
                })
                .catch((err) => observer.error(err));
        });
    }

}
