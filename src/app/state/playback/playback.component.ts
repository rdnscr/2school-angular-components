import { Component, Inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Action, dispatcherToken, stateToken } from '../state-machine';
import { Disposer } from '../../common';
import { AppState } from './..';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
    selector: 'state-playback',
    templateUrl: './playback.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatePlaybackComponent implements OnInit, OnDestroy {
    public stateIndex: number = 0;
    private maxState: number = 0;

    constructor( @Inject(stateToken) private state: ReplaySubject<AppState>, @Inject(dispatcherToken) private dispatcher: Subject<Action>,
                 private disposer: Disposer, private cd: ChangeDetectorRef) {

    }

    public get currentState(): Observable<AppState> {
        console.log(`state at index ${this.stateIndex} loaded`);
        if (this.stateIndex !== this.maxState) {
            return this.state.take(this.stateIndex);
        }

        return this.state;
    }

    public ngOnInit() {
        this.disposer.safeSubscribe(this.state.subscribe((state: AppState) => {
            this.maxState++;
            if (this.stateIndex === (this.maxState - 1)) {
                this.stateIndex = this.maxState;
            }
            this.cd.markForCheck(); // trigger change detection since we are in on push mode
        }));
    }

    public ngOnDestroy() {
        // unsubscribe as soon component is destroyed. Else there could be side effects and memory leaks for sure.
        this.disposer.dispose();
    }

    public onPrevious(): void {
        this.stateIndex--;
    }

    public onNext(): void {
        this.stateIndex++;
    }

    public get hasNext(): boolean {
        return this.maxState > this.stateIndex;
    }

    public get hasPrevious(): boolean {
        return this.maxState >= this.stateIndex && this.stateIndex > 0;
    }
}
