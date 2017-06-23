// Never import directly from rxjs root, because in this case the footprint of the whole library will be loaded!
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Action } from './action.type';
import { AppState } from '../';

import 'rxjs/add/operator/scan';

export let wrapIntoBehavior = (init: AppState, obs: Observable<AppState>): ReplaySubject<AppState> => {
    const res = new ReplaySubject();
    res.next(init);
    obs.subscribe((s) => res.next(s));
    return res;
};

export let stateFn = (initState: AppState, actions: Subject<Action>): ReplaySubject<AppState> => {
    const appStateObs: Observable<AppState> = actions.scan((state: AppState, action: Action) => {
        console.log(`Action ${action.name} will be executed`);
        let result = action.execute(state);
        console.log(`Action ${action.name} has been executed`);
        return result;
    }, initState);

    return wrapIntoBehavior(initState, appStateObs);
};
