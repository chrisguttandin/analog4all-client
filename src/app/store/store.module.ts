import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // tslint:disable-line:no-implicit-dependencies
import { storeFreeze } from 'ngrx-store-freeze'; // tslint:disable-line:no-implicit-dependencies
import { environment } from '../../environments/environment';
import { InstrumentsEffects } from './effects';
import { appReducer } from './store';

@NgModule({
    imports: [
        CommonModule,
        (environment.production)
            ? NgRxStoreModule.forRoot(appReducer)
            : NgRxStoreModule.forRoot(appReducer, { metaReducers: [ storeFreeze ] }),
        EffectsModule.forRoot([
            InstrumentsEffects
        ]),
        (environment.production)
            ? [ ]
            : StoreDevtoolsModule.instrument({ maxAge: 50 })
    ]
})
export class StoreModule { }
