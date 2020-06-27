import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // tslint:disable-line:no-implicit-dependencies
import { InstrumentsEffects } from './effects';
import { appReducer } from './store';

@NgModule({
    imports: [
        CommonModule,
        NgRxStoreModule.forRoot(appReducer, {
            runtimeChecks: {
                strictActionImmutability: ngDevMode,
                strictActionSerializability: ngDevMode,
                strictActionTypeUniqueness: ngDevMode,
                strictStateImmutability: ngDevMode,
                strictStateSerializability: ngDevMode
            }
        }),
        EffectsModule.forRoot([InstrumentsEffects]),
        ngDevMode ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
    ]
})
export class StoreModule {}
