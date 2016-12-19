import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    DownloadingService,
    ENDPOINT,
    FileReceivingService,
    FileSendingService,
    GeneratorsService,
    InstrumentsService,
    MidiJsonBpmService,
    MidiJsonEncodingService,
    PeerConnectingService,
    RenderingService,
    WaitingService,
    WindowService
} from './shared';
import { StoreModule } from './store';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpModule,
        StoreModule
    ],
    providers: [
        DownloadingService,
        { provide: ENDPOINT, useValue: '://analog4all-registry.eu-west-1.elasticbeanstalk.com/' },
        FileReceivingService,
        FileSendingService,
        GeneratorsService,
        InstrumentsService,
        MidiJsonBpmService,
        MidiJsonEncodingService,
        PeerConnectingService,
        RenderingService,
        WaitingService,
        WindowService
    ]
})
export class AppModule { }
