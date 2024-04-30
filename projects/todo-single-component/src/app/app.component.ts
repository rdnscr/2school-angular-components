import { Component } from '@angular/core';
import { Route, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { appRoutes } from './app.routes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatListModule } from '@angular/material/list';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'todo-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [MatSidenavModule, FlexLayoutModule, MatIconModule, MatListModule, RouterLink, NgFor, RouterLinkActive, MatToolbarModule, RouterOutlet]
})
export class AppComponent {
  public name = '2BIT Angular Demos';
  public navItems: Route[];

  constructor() {
    this.navItems = appRoutes.filter((route) => route.data);
  }
}
