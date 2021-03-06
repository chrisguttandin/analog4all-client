import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        loadChildren: () => import('./remote-registry').then((mdl) => mdl.RemoteRegistryModule),
        path: ''
    },
    {
        loadChildren: () => import('./instrument').then((mdl) => mdl.InstrumentModule),
        path: ''
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
