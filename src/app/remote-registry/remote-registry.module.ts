import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GearogsLinkComponent } from './gearogs-link/gearogs-link.component';
import { RemoteRegistryRoutingModule } from './remote-registry-routing.module';
import { RemoteRegistryComponent } from './remote-registry.component';
import { SoundCloudLinkComponent } from './sound-cloud-link/sound-cloud-link.component';

@NgModule({
    declarations: [GearogsLinkComponent, RemoteRegistryComponent, SoundCloudLinkComponent],
    imports: [CommonModule, RemoteRegistryRoutingModule]
})
export class RemoteRegistryModule {}
