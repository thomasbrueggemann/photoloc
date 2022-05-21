import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private centerPosition: L.Circle | undefined;

  _location: GeolocationPosition | undefined = undefined;
  get location(): GeolocationPosition | undefined {
    return this._location;
  }
  @Input() set location(value: GeolocationPosition | undefined) {
    this._location = value;
    if (value) {
      this.updateLocationOnMap(value);
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  private updateLocationOnMap(position: GeolocationPosition): void {
    this.map.setView([position.coords.latitude, position.coords.longitude], 13);

    if (this.centerPosition) {
      this.map.removeLayer(this.centerPosition);
    }

    this.centerPosition = L.circle(
      [position.coords.latitude, position.coords.longitude],
      {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: position.coords.accuracy,
      }
    ).addTo(this.map);

    this.map.fitBounds(this.centerPosition.getBounds());
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
