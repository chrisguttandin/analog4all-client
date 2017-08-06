import { Injectable } from '@angular/core';
import { IMaskableSubject, IStringifyableJsonObject } from 'rxjs-broker';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileReceivingService {

    public receive (dataChannelSubject: IMaskableSubject<IStringifyableJsonObject>): Observable<ArrayBuffer> {
        return new Observable((observer) => {
            let buffer: ArrayBuffer;

            let byteIndex = 0;

            const dataChannelSubscription = dataChannelSubject
                .subscribe({
                    complete () {
                        observer.error();
                    },
                    error (err) {
                        observer.error(err);
                    },
                    next (message) {
                        const { type } = message;

                        if (type === 'bof') {
                            buffer = new ArrayBuffer(<number> message.byteLength);
                        } else if (type === 'eof') {
                            dataChannelSubscription.unsubscribe();

                            observer.next(buffer);
                            observer.complete();
                        } else {
                            const destination = new Uint8Array(buffer);

                            const source = atob(<any> message);

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
