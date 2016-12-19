import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RemoteRegistryRoutingModule } from './remote-registry-routing.module';
import { RemoteRegistryComponent } from './remote-registry.component';

@NgModule({
    declarations: [
        RemoteRegistryComponent
    ],
    imports: [
        CommonModule,
        RemoteRegistryRoutingModule
    ]
})
export class RemoteRegistryModule { }
