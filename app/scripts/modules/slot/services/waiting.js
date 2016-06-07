import { first } from 'rxjs/operator/first';

/**
 * This service sends a waiting message to the data channel. It waits for the data channel to emit a
 * waiting message and then sends a waiting message again, just to be sure it reached the other end
 * while it was listening to the socket. It then waits for a ready event to finally resolve the
 * promise.
 */
export class WaitingService {

    wait (dataChannelSubject) {
        return new Promise((resolve, reject) => {
            var isPending = true,
                waitingChannel = dataChannelSubject.mask({ type: 'waiting' }),
                waitingChannelSubscription;

            dataChannelSubject
                .mask({ type: 'ready' })
                ::first()
                .subscribe({
                    complete () {
                        if (isPending) {
                            isPending = false;
                            reject(new Error('The underlying channel was closed before any value could be received.'));
                        }
                    },
                    error (err) {
                        if (isPending) {
                            isPending = false;
                            reject(err);
                        }
                    },
                    next () {
                        isPending = false;
                        resolve();
                    }
                });

            waitingChannelSubscription = waitingChannel
                .subscribe({
                    complete () {
                        if (isPending) {
                            isPending = false;
                            reject(new Error('The underlying channel was closed before any value could be received.'));
                        }
                    },
                    error (err) {
                        if (isPending) {
                            isPending = false;
                            reject(err);
                        }
                    },
                    next () {
                        waitingChannelSubscription.unsubscribe();
                        waitingChannel.next();
                    }
                });

            waitingChannel.next();
        });
    }

}
