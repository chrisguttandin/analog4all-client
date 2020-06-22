import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRemoteSubject, IStringifyableJsonObject } from 'rxjs-broker';

const CHUNK_SIZE = 1024;

@Injectable({
    providedIn: 'root'
})
export class FileSendingService {
    public send(dataChannelSubject: IRemoteSubject<IStringifyableJsonObject>, file: File): Observable<void> {
        return new Observable((observer) => {
            const fileReader = new FileReader();

            fileReader.onerror = () => observer.error(fileReader.error);

            fileReader.onload = () => {
                const buffer = fileReader.result;

                if (buffer instanceof ArrayBuffer) {
                    const byteLength = buffer.byteLength;

                    dataChannelSubject
                        .send({ byteLength, type: 'bof' })
                        .then(() => {
                            let byteIndex = 0;

                            const promise = Promise.resolve();

                            while (byteIndex + CHUNK_SIZE < byteLength) {
                                const slice = buffer.slice(byteIndex, byteIndex + CHUNK_SIZE);

                                promise.then(() => {
                                    dataChannelSubject.send(<any>btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(slice)))));
                                });

                                byteIndex += CHUNK_SIZE;
                            }

                            if (byteIndex < byteLength) {
                                const slice = buffer.slice(byteIndex);

                                promise.then(() => {
                                    dataChannelSubject.send(<any>btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(slice)))));
                                });
                            }

                            return promise;
                        })
                        .then(() => dataChannelSubject.send({ type: 'eof' }))
                        .then(() => {
                            observer.next();
                            observer.complete();
                        });
                } else {
                    observer.error(new Error('Reading the file failed.'));
                }
            };

            fileReader.readAsArrayBuffer(file);
        });
    }
}
