import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private geoLocationWatch: number | undefined;
  private centerPosition: L.Circle | undefined;

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

  private startGeolocationWatch(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    this.geoLocationWatch = navigator.geolocation.watchPosition(
      (position) => this.updateLocationOnMap(position),
      (err) => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      },
      options
    );
  }

  private stopGeolocationWatch(): void {
    if (this.geoLocationWatch) {
      navigator.geolocation.clearWatch(this.geoLocationWatch);
    }
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
    this.startGeolocationWatch();
  }

  ngOnDestroy(): void {
    this.stopGeolocationWatch();
  }
}
