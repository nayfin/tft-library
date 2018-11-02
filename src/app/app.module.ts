import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgAisModule } from 'angular-instantsearch';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule, DesignModule, PipesModule } from 'tft-library';
import { ExamplesModule } from './examples/examples.module';

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
    PipesModule
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
