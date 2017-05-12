import { Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { parseArrayBuffer } from 'midi-json-parser';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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

    private _checkForFileOnFocus: boolean;

    public filename$: Observable<string>;

    private _filenameChanges$: BehaviorSubject<string>;

    public isDraggedOver: boolean;

    private _onChange: (_: any) => void;

    private _onTouched: () => void;

    private _stateChanges$: BehaviorSubject<string>;

    public state$;

    private _valueChanges$: BehaviorSubject<any>; // @todo BehaviorSubject<MidiJson>

    private _valueChangesSubscription: Subscription;

    constructor () {
        this.isDraggedOver = false;
        this._filenameChanges$ = new BehaviorSubject(null);
        this._onChange = (_: any) => {}; // tslint:disable-line:no-empty
        this._onTouched = () => {}; // tslint:disable-line:no-empty
        this._stateChanges$ = new BehaviorSubject('empty');
        this._valueChanges$ = new BehaviorSubject(null);
    }

    public ngOnDestroy () {
        this._valueChangesSubscription.unsubscribe();
    }

    public ngOnInit () {
        this.filename$ = this._filenameChanges$.asObservable();

        this.state$ = this._stateChanges$.asObservable();

        this._valueChangesSubscription = this._valueChanges$
            .switchMap((file) => {
                if (file === null) {
                    this._filenameChanges$.next(null);
                    this._stateChanges$.next('empty');

                    return Observable.of(null);
                }

                return Observable.create((observer) => {
                    const fileReader = new FileReader();

                    this._filenameChanges$.next(file.name);
                    this._stateChanges$.next('parsing');

                    fileReader.addEventListener('load', () => {
                        parseArrayBuffer(fileReader.result)
                            .then((midiJson) => {
                                this._stateChanges$.next('filled');

                                observer.next({ filename: file.name, midiJson });
                            })
                            .catch((err) => {
                                this._stateChanges$.next('failed');

                                observer.next(null);
                            })
                            .then(() => observer.complete());
                    });

                    fileReader.readAsArrayBuffer(file);
                });
            })
            .subscribe((midiJson) => this._onChange(midiJson));
    }

    public onChanged (file) {
        this._valueChanges$.next((file === undefined) ? null : file);
    }

    public onClick () {
        this._checkForFileOnFocus = true;
    }

    public onDragEnter () {
        this.isDraggedOver = true;
    }

    public onDragLeave () {
        this.isDraggedOver = false;
    }

    public onDragover (event) {
        event.preventDefault();
    }

    public onDrop (event) {
        event.preventDefault();

        this._checkForFileOnFocus = false;
        this.isDraggedOver = false;

        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            this.onChanged(event.dataTransfer.files[0]);
        }
    }

    public onFocus (event) {
        if (this._checkForFileOnFocus) {
            setTimeout(() => {
                if (this._checkForFileOnFocus) {
                    this._checkForFileOnFocus = false;

                    this.onChanged(event.target.files[0]);
                }
            });
        }
    }

    public onTouched () {
        this._onTouched();
    }

    public registerOnChange (fn: (_: any) => void): void {
        this._onChange = fn;
    }

    public registerOnTouched (fn: () => void): void {
        this._onTouched = fn;
    }

    public setDisabledState (isDisabled: boolean): void {
        // @todo
    }

    public writeValue (value: any): void {
        this._valueChanges$.next(value);
    }

}
