import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
        HttpClientModule,
        StoreModule
    ],
    providers: [
        DownloadingService,
        { provide: ENDPOINT, useValue: '://w8flhge089.execute-api.eu-west-1.amazonaws.com/dev/' },
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
