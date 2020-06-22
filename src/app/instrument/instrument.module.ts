import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FileInputComponent } from './file-input/file-input.component';
import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentComponent } from './instrument.component';

@NgModule({
    declarations: [FileInputComponent, InstrumentComponent],
    imports: [CommonModule, InstrumentRoutingModule, ReactiveFormsModule]
})
export class InstrumentModule {}
