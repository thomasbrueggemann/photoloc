import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '../locations/location';
import { locationsSelector } from '../locations/locations.selectors';
import { LocationsState } from '../locations/locations.state';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  locations$: Observable<Location[]>;

  constructor(
    private locationsStore: Store<LocationsState>) {

    this.locations$ = locationsStore.select(locationsSelector);
  }

  ngOnInit(): void {
  }

}
