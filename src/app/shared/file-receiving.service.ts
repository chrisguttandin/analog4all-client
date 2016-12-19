import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FileReceivingService {

    public receive (dataChannelSubject) {
        return Observable.create((observer) => {
            let buffer;

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
                            buffer = new ArrayBuffer(message.byteLength);
                        } else if (type === 'eof') {
                            dataChannelSubscription.unsubscribe();

                            observer.next(buffer);
                            observer.complete();
                        } else {
                            const destination = new Uint8Array(buffer);

                            const source = atob(message);

                            for (let i = byteIndex, length = byteIndex + source.length; i < length; i += 1) {
                                destination[i] = source.charCodeAt(i - byteIndex);
                            }

                            byteIndex += source.length;
                        }
                    }
                });
        });
    }

}
