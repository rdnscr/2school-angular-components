import { CommonModule } from './common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatDialogModule } from '@angular/material';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, NoPreloading } from '@angular/router';
import { PlaygroundState } from './common';
import { StateModule } from './state';
import { FlexLayoutModule } from '@angular/flex-layout';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from '../environments/environment';
import { ROUTES } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { AboutComponent } from 'app/about';

interface StoreType {
  state: PlaygroundState;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent, NoContentComponent, AboutComponent],
  imports: [BrowserModule, FormsModule, HttpModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule,
    MatDialogModule, FlexLayoutModule, BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: NoPreloading, enableTracing: true }),
    CommonModule.forRoot(), StateModule.forRoot()],
  providers: [...environment.ENV_PROVIDERS]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    // public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    // this.appState = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    // const state = this.appState;
    // store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
