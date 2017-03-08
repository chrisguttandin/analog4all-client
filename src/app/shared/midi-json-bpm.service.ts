import { Injectable } from '@angular/core';

@Injectable()
export class MidiJsonBpmService {

    // @todo A very similar function exists in the midi-file-slicer module.
    public read (midiJson) {
        const { tracks } = midiJson;

        for (const events of tracks) {
            for (const event of events) {
                if ('setTempo' in event) {
                    return (60000000 / event.setTempo.microsecondsPerBeat);
                }
            }
        }

        return 120;
    }

    public write (midiJson, bpm: number) {
        const microsecondsPerBeat = (60000000 / bpm);

        let wroteBpmInfo = false;

        const tracks = midiJson.tracks
            .map((events) => events
                .map((event) => {
                    if (!wroteBpmInfo && 'setTempo' in event) {
                        wroteBpmInfo = true;

                        return Object.assign({}, event, {
                            setTempo: Object.assign({}, event.setTempo, {
                                microsecondsPerBeat
                            })
                        });
                    }

                    return event;
                }));

        if (wroteBpmInfo) {
            return Object.assign({}, midiJson, { tracks });
        }

        return Object.assign({}, midiJson, {
            tracks: [
                [
                    {
                        delta: 0,
                        setTempo: {
                            microsecondsPerBeat
                        }
                    },
                    ...midiJson.tracks[0]
                ],
                ...midiJson.tracks.slice(1)
            ]
        });
    }

}
