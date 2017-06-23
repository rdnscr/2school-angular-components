import { PlaygroundState } from './common/app-state.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ROUTES } from './app.routes';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Route } from '@angular/router';
import { stateToken } from './state';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styles: [ 'h1 { color: #00BCD4; }' ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public name = 'Angular 2 Webpack Starter';
  public navItems: Route[];

  constructor(@Inject(stateToken) public state: ReplaySubject<PlaygroundState>) {
    this.navItems = ROUTES.filter((route) => route.data);
  }

  public ngOnInit() {
    // console.log('Initial App State', this.appState);
  }
}
