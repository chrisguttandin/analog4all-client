import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { ENDPOINT, GeneratorsService, InstrumentsService, MidiJsonBpmService, RenderingService } from '../shared';

@Component({
    styleUrls: [ './instrument.component.css' ],
    templateUrl: './instrument.component.html'
})
export class InstrumentComponent implements OnDestroy, OnInit {

    public hasMidiJson$;

    public instrument$;

    public instrumentName$;

    public renderForm: FormGroup;

    public sampleUrl$;

    private _bpmDisabledSubscription;

    constructor (
        private _activatedRoute: ActivatedRoute,
        @Inject(ENDPOINT) private _endpoint,
        private _formBuilder: FormBuilder,
        private _generatorsService: GeneratorsService,
        private _instrumentsService: InstrumentsService,
        private _midiJsonBpmService: MidiJsonBpmService,
        private _renderingService: RenderingService
    ) { }

    public ngOnDestroy () {
        this._bpmDisabledSubscription.unsubscribe();
    }

    public ngOnInit () {
        this.instrument$ = this._activatedRoute.data
            .switchMap(({ instrument: { id } }) => this._instrumentsService.select(id));

        this.instrumentName$ = this.instrument$
            .map((instrument) => (instrument === null) ? null : instrument.name);

        this.renderForm = this._formBuilder.group({
            bpm: { disabled: true, value: 120 },
            file: [ null ]
        });

        const midiJsonAndFilename$ = this.renderForm.get('file').valueChanges;

        this.hasMidiJson$ = midiJsonAndFilename$
            .map((value) => (value === null) ? false : true);

        this._bpmDisabledSubscription = midiJsonAndFilename$
            .subscribe((midiJsonAndFilename) => {
                if (midiJsonAndFilename) {
                    const { midiJson } = midiJsonAndFilename;

                    this.renderForm.get('bpm').setValue(this._midiJsonBpmService.read(midiJson));
                    this.renderForm.get('bpm').enable();
                } else {
                    this.renderForm.get('bpm').reset({ disabled: true, value: 120 });
                }
            });

        this.sampleUrl$ = this.instrument$
            .map((instrument) => {
                if (instrument !== null && 'sample' in instrument) {
                    return `https${ this._endpoint }samples/${ instrument.sample.id }.wav`;
                }

                return null;
            });
    }

    public render () {
        const bpm = this.renderForm.get('bpm').value;
        const { filename, midiJson } = this.renderForm.get('file').value;

        this.instrument$
            .take(1)
            .mergeMap((instrument) => this._renderingService.render(instrument, bpm, filename, midiJson))
            .subscribe(() => {
                // @todo
            });
    }

}
