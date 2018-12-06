import { Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { parseArrayBuffer } from 'midi-json-parser';
import { IMidiFile } from 'midi-json-parser-worker';
import { BehaviorSubject, Observable, Observer, Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileInputComponent) // tslint:disable-line:no-forward-ref
        }
    ],
    selector: 'anc-file-input',
    styleUrls: [ './file-input.component.css' ],
    templateUrl: './file-input.component.html'
})
export class FileInputComponent implements ControlValueAccessor, OnDestroy, OnInit {

    public filename$!: Observable<null | string>;

    public isDraggedOver: boolean;

    public state$!: Observable<string>;

    private _checkForFileOnFocus: boolean;

    private _filenameChanges$: BehaviorSubject<null | string>;

    private _onChange: (_: any) => void;

    private _onTouched: () => void;

    private _stateChanges$: BehaviorSubject<string>;

    private _valueChanges$: BehaviorSubject<any>; // @todo BehaviorSubject<MidiJson>

    private _valueChangesSubscription: null | Subscription;

    constructor () {
        this._checkForFileOnFocus = false;
        this.isDraggedOver = false;
        this._filenameChanges$ = new BehaviorSubject<null | string>(null);
        this._onChange = (_: any) => {}; // tslint:disable-line:no-empty
        this._onTouched = () => {}; // tslint:disable-line:no-empty
        this._stateChanges$ = new BehaviorSubject('empty');
        this._valueChanges$ = new BehaviorSubject(null);
        this._valueChangesSubscription = null;
    }

    public ngOnDestroy (): void {
        if (this._valueChangesSubscription !== null) {
            this._valueChangesSubscription.unsubscribe();
        }
    }

    public ngOnInit (): void {
        this.filename$ = this._filenameChanges$.asObservable();

        this.state$ = this._stateChanges$.asObservable();

        this._valueChangesSubscription = this._valueChanges$
            .pipe(
                switchMap((file) => {
                    if (file === null) {
                        this._filenameChanges$.next(null);
                        this._stateChanges$.next('empty');

                        return of(null);
                    }

                    return Observable.create((observer: Observer<null | { filename: string, midiJson: IMidiFile }>) => {
                        const fileReader = new FileReader();

                        this._filenameChanges$.next((<File> file).name);
                        this._stateChanges$.next('parsing');

                        fileReader.addEventListener('load', () => {
                            if (fileReader.result instanceof ArrayBuffer) {
                                parseArrayBuffer(fileReader.result)
                                    .then((midiJson) => {
                                        this._stateChanges$.next('filled');

                                        observer.next({ filename: (<File> file).name, midiJson });
                                    })
                                    .catch(() => {
                                        this._stateChanges$.next('failed');

                                        observer.next(null);
                                    })
                                    .then(() => observer.complete());
                            } else {
                                observer.error(new Error('Reading the file failed.'));
                            }
                        });

                        fileReader.readAsArrayBuffer((<File> file));
                    });
                })
            )
            .subscribe((midiJson) => this._onChange(midiJson)); // tslint:disable-line:rxjs-prefer-async-pipe
    }

    public onChanged (file: File): void {
        this._valueChanges$.next((file === undefined) ? null : file);
    }

    public onClick (): void {
        this._checkForFileOnFocus = true;
    }

    public onDragEnter (): void {
        this.isDraggedOver = true;
    }

    public onDragLeave (): void {
        this.isDraggedOver = false;
    }

    public onDragover (event: DragEvent): void {
        event.preventDefault();
    }

    public onDrop (event: DragEvent): void {
        event.preventDefault();

        this._checkForFileOnFocus = false;
        this.isDraggedOver = false;

        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            this.onChanged(event.dataTransfer.files[0]);
        }
    }

    public onFocus (event: FocusEvent): void {
        if (this._checkForFileOnFocus) {
            setTimeout(() => {
                if (this._checkForFileOnFocus) {
                    this._checkForFileOnFocus = false;

                    this.onChanged((<any> event.target).files[0]);
                }
            });
        }
    }

    public onTouched (): void {
        this._onTouched();
    }

    public registerOnChange (fn: (_: any) => void): void {
        this._onChange = fn;
    }

    public registerOnTouched (fn: () => void): void {
        this._onTouched = fn;
    }

    // @todo public setDisabledState (isDisabled: boolean): void { }

    public writeValue (value: any): void {
        this._valueChanges$.next(value);
    }

}
