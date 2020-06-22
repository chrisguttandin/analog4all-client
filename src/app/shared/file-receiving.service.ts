import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRemoteSubject, IStringifyableJsonObject } from 'rxjs-broker';

@Injectable({
    providedIn: 'root'
})
export class FileReceivingService {
    public receive(dataChannelSubject: IRemoteSubject<IStringifyableJsonObject>): Observable<ArrayBuffer> {
        return new Observable((observer) => {
            let buffer: ArrayBuffer;

            let byteIndex = 0;

            const dataChannelSubscription = dataChannelSubject.subscribe({
                complete(): void {
                    observer.error();
                },
                error(err): void {
                    observer.error(err);
                },
                next(message): void {
                    const { type } = message;

                    if (type === 'bof') {
                        buffer = new ArrayBuffer(<number>message.byteLength);
                    } else if (type === 'eof') {
                        dataChannelSubscription.unsubscribe();

                        observer.next(buffer);
                        observer.complete();
                    } else {
                        const destination = new Uint8Array(buffer);

                        const source = atob(<any>message);

                        const length = byteIndex + source.length;

                        for (let i = byteIndex; i < length; i += 1) {
                            destination[i] = source.charCodeAt(i - byteIndex);
                        }

                        byteIndex += source.length;
                    }
                }
            });
        });
    }
}
