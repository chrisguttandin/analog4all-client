import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        loadChildren: () => import('./remote-registry').then(({ RemoteRegistryModule }) => RemoteRegistryModule),
        path: ''
    },
    {
        loadChildren: () => import('./instrument').then(({ InstrumentModule }) => InstrumentModule),
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
