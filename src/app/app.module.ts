import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ENDPOINT } from './shared';
import { StoreModule } from './store';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: !ngDevMode }),
        StoreModule
    ],
    providers: [{ provide: ENDPOINT, useValue: '://jbnw79pt56.execute-api.eu-west-1.amazonaws.com/dev/' }]
})
export class AppModule {}
