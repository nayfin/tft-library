import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgAisModule } from 'angular-instantsearch';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule, DesignModule, CallbackPipe } from 'tft-library';
import { ExamplesModule } from './examples/examples.module';
import {  } from 'tft-library';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    DesignModule,
    ExamplesModule,
    // NgAisModule.forRoot(),
  ],
  providers: [
    CallbackPipe
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
