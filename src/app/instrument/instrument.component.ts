import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, mergeMap, switchMap } from 'rxjs/operators';
import { ENDPOINT, MidiJsonBpmService, RenderingService } from '../shared';
import { TAppState, TInstrument, createInstrumentByIdSelector } from '../store';

@Component({
    styleUrls: ['./instrument.component.css'],
    templateUrl: './instrument.component.html'
})
export class InstrumentComponent implements OnDestroy, OnInit {
    public hasMidiJson$!: Observable<boolean>;

    public instrument$!: Observable<null | TInstrument>;

    public instrumentName$!: Observable<null | string>;

    public renderForm!: FormGroup;

    public sampleUrl$!: Observable<null | string>;

    private _bpmDisabledSubscription: null | Subscription;

    constructor(
        private _activatedRoute: ActivatedRoute,
        @Inject(ENDPOINT) private _endpoint: string,
        private _formBuilder: FormBuilder,
        private _midiJsonBpmService: MidiJsonBpmService,
        private _renderingService: RenderingService,
        private _store: Store<TAppState>
    ) {
        this._bpmDisabledSubscription = null;
    }

    public ngOnDestroy(): void {
        this._bpmDisabledSubscription?.unsubscribe();
    }

    public ngOnInit(): void {
        this.instrument$ = this._activatedRoute.data.pipe(
            switchMap(({ instrument: { id } }) => createInstrumentByIdSelector(this._store, id))
        );

        this.instrumentName$ = this.instrument$.pipe(map((instrument) => (instrument === null ? null : instrument.name)));

        this.renderForm = this._formBuilder.group({
            bpm: { disabled: true, value: 120 },
            file: [null]
        });

        const fileFormControl = this.renderForm.get('file');

        if (fileFormControl !== null) {
            const midiJsonAndFilename$ = fileFormControl.valueChanges;

            this.hasMidiJson$ = midiJsonAndFilename$.pipe(map((value) => (value === null ? false : true)));

            this._bpmDisabledSubscription = midiJsonAndFilename$.subscribe((midiJsonAndFilename) => {
                // tslint:disable-line:rxjs-prefer-async-pipe
                const bpmFormControl = this.renderForm.get('bpm');

                if (bpmFormControl !== null) {
                    if (midiJsonAndFilename) {
                        const { midiJson } = midiJsonAndFilename;

                        bpmFormControl.setValue(this._midiJsonBpmService.read(midiJson));
                        bpmFormControl.enable();
                    } else {
                        bpmFormControl.reset({ disabled: true, value: 120 });
                    }
                }
            });
        }

        this.sampleUrl$ = this.instrument$.pipe(
            map((instrument) => {
                if (instrument !== null && instrument.sample !== undefined) {
                    return `https${this._endpoint}samples/${instrument.sample.id}.wav`;
                }

                return null;
            })
        );
    }

    public render(): void {
        const bpmFormControl = this.renderForm.get('bpm');
        const fileFormControl = this.renderForm.get('file');

        if (bpmFormControl !== null && fileFormControl !== null) {
            const bpm = bpmFormControl.value;
            const { filename, midiJson } = fileFormControl.value;

            this.instrument$
                .pipe(
                    first(),
                    filter((instrument): instrument is TInstrument => instrument !== null),
                    mergeMap((instrument) => this._renderingService.render(instrument, bpm, filename, midiJson))
                )
                .subscribe(() => {
                    // tslint:disable-line:rxjs-prefer-async-pipe
                    // @todo
                });
        }
    }
}
