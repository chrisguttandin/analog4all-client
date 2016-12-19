import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteRegistryComponent } from './remote-registry.component';

const routes: Routes = [
    {
        component: RemoteRegistryComponent,
        path: ''
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
export class RemoteRegistryRoutingModule { }
