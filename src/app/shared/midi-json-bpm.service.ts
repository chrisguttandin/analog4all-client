import { Injectable } from '@angular/core';
import { IMidiFile, IMidiSetTempoEvent } from 'midi-json-parser-worker';

@Injectable()
export class MidiJsonBpmService {

    // @todo A very similar function exists in the midi-file-slicer module.
    public read (midiJson: IMidiFile): number {
        const { tracks } = midiJson;

        for (const events of tracks) {
            for (const event of events) {
                if ('setTempo' in event) {
                    return (60000000 / (<IMidiSetTempoEvent> event).setTempo.microsecondsPerBeat);
                }
            }
        }

        return 120;
    }

    public write (midiJson: IMidiFile, bpm: number): IMidiFile {
        const microsecondsPerBeat = (60000000 / bpm);

        let wroteBpmInfo = false;

        const tracks = midiJson.tracks
            .map((events) => events
                .map((event) => {
                    if (!wroteBpmInfo && 'setTempo' in event) {
                        wroteBpmInfo = true;

                        return { ...event, setTempo: { ...(<IMidiSetTempoEvent> event).setTempo, microsecondsPerBeat } };
                    }

                    return event;
                }));

        if (wroteBpmInfo) {
            return { ...midiJson, tracks };
        }

        return {
            ...midiJson,
            tracks: [
                [
                    <IMidiSetTempoEvent> {
                        delta: 0,
                        setTempo: {
                            microsecondsPerBeat
                        }
                    },
                    ...midiJson.tracks[0]
                ],
                ...midiJson.tracks.slice(1)
            ]
        };
    }

}
