import { MdButtonModule, MdInputModule } from '@angular/material';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { STATE_MACHINE_CONFIG } from './state-machine';
import { StatePlaybackComponent } from './playback';

const APP_WIDE_SINGLETON: Provider[] = <Provider[]> [...STATE_MACHINE_CONFIG];

// Application wide singletons should only be declared in for root!
@NgModule({
    imports: [MdButtonModule, MdInputModule],
    declarations: [StatePlaybackComponent],
    exports: [StatePlaybackComponent]
})
export class StateModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: StateModule, providers: APP_WIDE_SINGLETON };
    }
}
