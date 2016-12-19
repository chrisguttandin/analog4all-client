import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        loadChildren: './remote-registry/remote-registry.module#RemoteRegistryModule',
        path: ''
    }, {
        loadChildren: './instrument/instrument.module#InstrumentModule',
        path: ''
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule { }
