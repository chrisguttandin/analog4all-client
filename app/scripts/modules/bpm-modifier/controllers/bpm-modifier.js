class BpmModifierController {

    constructor ($scope) {
        this._$scope = $scope;
    }

    modify () {
        this.isWithoutSpecifiedBpm = false;

        this._writeBpmAsMicrosecondsPerBeat();

        this.onChange({ json: this.json });
    }

    $onInit () {
        this.bpm = this._readMicrosecondsPerBeatAsBpm();

        if (this.bpm === undefined) {
            this.bpm = 120;
            this.isWithoutSpecifiedBpm = false;
        } else {
            this.isWithoutSpecifiedBpm = true;
        }
    }

    // @todo A very similar function exists in the midi-file-slicer module.
    _readMicrosecondsPerBeatAsBpm () {
        var { tracks } = this.json;

        for (let i = 0, length = tracks.length; i < length; i += 1) {
            let track = tracks[i];

            for (let j = 0, length = track.length; j < length; j += 1) {
                let event = track[j];

                if (event.setTempo !== undefined) {
                    return (60000000 / event.setTempo.microsecondsPerBeat);
                }
            }
        }
    }

    _writeBpmAsMicrosecondsPerBeat () {
        var { tracks } = this.json;

        for (let i = 0, length = tracks.length; i < length; i += 1) {
            let track = tracks[i];

            for (let j = 0, length = track.length; j < length; j += 1) {
                let event = track[j];

                // @todo Do not modify the exisiting event.
                if (event.setTempo !== undefined) {
                    event.setTempo.microsecondsPerBeat = (60000000 / this.bpm);

                    return;
                }
            }
        }

        // @todo Do not modify the exisiting array.
        tracks[0].unshift({
            delta: 0,
            setTempo: {
                microsecondsPerBeat: (60000000 / this.bpm)
            }
        });
    }

}

module.exports = BpmModifierController;
