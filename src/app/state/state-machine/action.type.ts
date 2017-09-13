/* tslint:disable */

import { pathCopyHelper } from '../utils';
import { AppState } from '../';

export interface Action {
    name: string;
    execute(initState: AppState): AppState;
}

export abstract class ActionBase<TState extends AppState> implements Action {
    constructor(public name: string, private copySelector: (initState: TState) => any) {

    }

    public execute(initState: TState): TState {
        let newState = pathCopyHelper.deepCopyByObjectPath(initState, this.copySelector);
        this.executeLogic(newState);
        return newState;
    }

    protected abstract executeLogic(newState: TState): void;
}
