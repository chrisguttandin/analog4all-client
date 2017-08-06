import { Injectable } from '@angular/core';
import { IMaskableSubject, IStringifyableJsonObject } from 'rxjs-broker';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

/**
 * This service sends a waiting message to the data channel. It waits for the data channel to emit a
 * waiting message and then sends a waiting message again, just to be sure it reached the other end
 * while it was listening to the socket. It then waits for a ready event to finally resolve the
 * promise.
 */
@Injectable()
export class WaitingService {

    public wait (dataChannelSubject: IMaskableSubject<IStringifyableJsonObject>) {
        return Observable.create((observer: Observer<void>) => {
            let isPending = true;

            const waitingChannel = dataChannelSubject.mask({ type: 'waiting' });

            dataChannelSubject
                .mask({ type: 'ready' })
                .first()
                .subscribe({
                    complete () {
                        if (isPending) {
                            isPending = false;
                            observer.error(new Error('The underlying channel was closed before any value could be received.'));
                        }
                    },
                    error (err) {
                        if (isPending) {
                            isPending = false;
                            observer.error(err);
                        }
                    },
                    next () {
                        isPending = false;
                        observer.next(undefined);
                        observer.complete();
                    }
                });

            const waitingChannelSubscription = waitingChannel
                .subscribe({
                    complete () {
                        if (isPending) {
                            isPending = false;
                            observer.error(new Error('The underlying channel was closed before any value could be received.'));
                        }
                    },
                    error (err) {
                        if (isPending) {
                            isPending = false;
                            observer.error(err);
                        }
                    },
                    next () {
                        waitingChannelSubscription.unsubscribe();
                        waitingChannel.next(undefined);
                    }
                });

            waitingChannel.next(undefined);
        });
    }

}
