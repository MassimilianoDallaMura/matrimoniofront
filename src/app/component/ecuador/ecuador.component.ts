import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ecuador',
  templateUrl: './ecuador.component.html',
  styleUrls: ['./ecuador.component.scss']
})
export class EcuadorComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: -1.679582, lng: -80.812478 };
  userLocation: google.maps.LatLngLiteral | null = null;
  zoom = 17;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 30,
    minZoom: 2,
  };

  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;

  constructor(private location: Location) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
  }

  ngOnInit(): void {
    this.getUserLocation();
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.calculateRoute();
        },
        (error) => {
          console.error('Errore nella geolocalizzazione:', error);
        }
      );
    } else {
      console.error('Geolocalizzazione non supportata dal browser.');
    }
  }

  private calculateRoute(): void {
    if (this.userLocation) {
      const request: google.maps.DirectionsRequest = {
        origin: this.userLocation,
        destination: this.center,
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(result);
        } else {
          console.error(`Errore nella richiesta delle direzioni: ${status}`);
          console.error('Result:', result);
        }
      });
    }
  }

  onMapReady(event: any): void {
    const map = event as google.maps.Map;
    this.directionsRenderer.setMap(map);
  }

  goBack(): void {
    this.location.back();
  }
}
