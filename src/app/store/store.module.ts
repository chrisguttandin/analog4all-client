import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // tslint:disable-line:no-implicit-dependencies
import { environment } from '../../environments/environment';
import { InstrumentsEffects } from './effects';
import { appReducer } from './store';

@NgModule({
    imports: [
        CommonModule,
        NgRxStoreModule.forRoot(appReducer, {
            runtimeChecks: {
                strictActionImmutability: !environment.production,
                strictActionSerializability: !environment.production,
                strictStateImmutability: !environment.production,
                strictStateSerializability: !environment.production
            }
        }),
        EffectsModule.forRoot([
            InstrumentsEffects
        ]),
        (environment.production)
            ? [ ]
            : StoreDevtoolsModule.instrument({ maxAge: 50 })
    ]
})
export class StoreModule { }
