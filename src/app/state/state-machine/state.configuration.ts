import { OpaqueToken } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { stateFn, Action } from '../state-machine';
import { AppState } from '../';

export const initStateToken = new OpaqueToken('initState');
export const dispatcherToken = new OpaqueToken('dispatcher');
export const stateToken = new OpaqueToken('state');

let stateObs: ReplaySubject<AppState>;
export function stateFactory(initState: AppState, actions: Subject<Action>): ReplaySubject<AppState> {
    if (!stateObs) {
        stateObs = stateFn(initState, actions);
    }

    return stateObs;
};

export function dispatcherFactory(): Subject<Action> {
    return new Subject<Action>();
}

export const STATE_MACHINE_CONFIG = [
    { provide: dispatcherToken, useFactory: dispatcherFactory },
    { provide: stateToken, useFactory: stateFactory, deps: [initStateToken, dispatcherToken] }
];
