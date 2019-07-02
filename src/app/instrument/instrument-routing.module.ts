import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentComponent } from './instrument.component';
import { InstrumentResolver } from './instrument.resolver';

const routes: Routes = [
    {
        component: InstrumentComponent,
        path: ':id',
        resolve: {
            instrument: InstrumentResolver
        }
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class InstrumentRoutingModule { }
