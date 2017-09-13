import { PlaygroundState } from './app-state.model';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { Disposer } from './utils';
import { initStateToken } from '../state';

export function disposerFactory() { return new Disposer(); }
export function stateFactory() { return new PlaygroundState(); }
export const APP_WIDE_SINGLETON: Provider[] = <Provider[]> [{ provide: Disposer, useFactory: disposerFactory },
{ provide: initStateToken, useFactory: stateFactory }];

// Application wide singletons should only be declared in for root!
@NgModule({
  providers: []
})
export class CommonModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: CommonModule, providers: APP_WIDE_SINGLETON };
  }
}
