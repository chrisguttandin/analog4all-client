import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { IMaskableSubject, TStringifyableJsonValue } from 'rxjs-broker';
import { first } from 'rxjs/operators';

/**
 * This service sends a waiting message to the data channel. It waits for the data channel to emit a
 * waiting message and then sends a waiting message again, just to be sure it reached the other end
 * while it was listening to the socket. It then waits for a ready event to finally resolve the
 * promise.
 */
@Injectable()
export class WaitingService {

    public wait (dataChannelSubject: IMaskableSubject<TStringifyableJsonValue>): Observable<void> {
        return new Observable((observer: Observer<void>) => {
            let isPending = true;

            const waitingChannel = dataChannelSubject.mask({ type: 'waiting' });

            dataChannelSubject
                .mask({ type: 'ready' })
                .pipe(
                    first<any>()
                )
                .subscribe({
                    complete (): void {
                        if (isPending) {
                            isPending = false;
                            observer.error(new Error('The underlying channel was closed before any value could be received.'));
                        }
                    },
                    error (err): void {
                        if (isPending) {
                            isPending = false;
                            observer.error(err);
                        }
                    },
                    next (): void {
                        isPending = false;
                        observer.next(undefined);
                        observer.complete();
                    }
                });

            const waitingChannelSubscription = waitingChannel
                .subscribe({
                    complete (): void {
                        if (isPending) {
                            isPending = false;
                            observer.error(new Error('The underlying channel was closed before any value could be received.'));
                        }
                    },
                    error (err): void {
                        if (isPending) {
                            isPending = false;
                            observer.error(err);
                        }
                    },
                    next (): void {
                        waitingChannelSubscription.unsubscribe();
                        waitingChannel.next(undefined);
                    }
                });

            waitingChannel.next(undefined);
        });
    }

}
