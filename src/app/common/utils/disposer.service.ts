import { Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class Disposer {
    private subscriptions: Subscription[] = [];

    public safeSubscribe(...subscribe: Subscription[]) {
        subscribe.forEach((subscription: Subscription) => this.subscriptions.push(subscription));
    }

    public dispose(): void {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
