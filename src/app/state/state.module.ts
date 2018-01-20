import { MatButtonModule, MatInputModule, MatCardModule } from '@angular/material';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { STATE_MACHINE_CONFIG } from './state-machine';
import { StatePlaybackComponent } from './playback';

const APP_WIDE_SINGLETON: Provider[] = [...STATE_MACHINE_CONFIG] as Provider[];

// Application wide singletons should only be declared in for root!
@NgModule({
    imports: [MatButtonModule, MatInputModule, MatCardModule],
    declarations: [StatePlaybackComponent],
    exports: [StatePlaybackComponent]
})
export class StateModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: StateModule, providers: APP_WIDE_SINGLETON };
    }
}
