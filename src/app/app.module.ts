import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNewLocationComponent } from './add-new-location/add-new-location.component';
import { OverviewComponent } from './overview/overview.component';
import { MapComponent } from './map/map.component';
import { addNewLocationReducer } from './add-new-location/add-new-location.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AddNewLocationEffects } from './add-new-location/add-new-location.effects';
import { locationsReducer } from './locations/locations.reducer';
import { LocationsEffects } from './locations/locations.effects';

@NgModule({
  declarations: [
    AppComponent,
    AddNewLocationComponent,
    OverviewComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ addNewLocation: addNewLocationReducer, locations: locationsReducer }),
    EffectsModule.forRoot([AddNewLocationEffects, LocationsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
