import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNewLocationComponent } from './add-new-location/add-new-location.component';
import { OverviewComponent } from './overview/overview.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewLocationComponent,
    OverviewComponent,
    MapComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
