import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import Geocoder from 'leaflet-control-geocoder';

//#region // props & functions needed to deal wit listeners by ref
let map: any;
let marker: any;
let latlngs: any[] = [];
let polyline: any = {};
let isDrawing: boolean = false;

function drawPolyline(e: any) {
  latlngs.push([e.latlng.lat, e.latlng.lng]);
  polyline = L.polyline(latlngs, {color: 'black'}).addTo(map);
}

function createMarker(center: any) {
  const icon = L.icon({
    iconUrl: './../../assets/map-marker.png',
    iconSize: [25, 40]
  });  
  
  removeMarker()
  
  marker = L.marker(center, { icon: icon })
  
  map.addLayer(marker);
}

function removeMarker() {
  (Boolean(marker)) && map.removeLayer(marker)
}
//#endregion

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    this.createMap([ 30.7865, 31.0004 ]);
    this.geoCoder();
  }

  //#region // create map
  createMap(center: any) {
    map = L.map('map', {
      center: center,
      zoom: 7
    }); 
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });
    
    tiles.addTo(map);  

    createMarker(center)
    
    this.addMarkerListener();
  }
  //#endregion

  //#region // marker listeners
  addMarkerListener() {
    L.DomEvent.addListener(map, 'click', this.mapClicked)
  }

  removeMarkerListener() {
    L.DomEvent.removeListener(map, 'click', this.mapClicked)
  }
  //#endregion

  //#region // when user click on map
  mapClicked(e: any) {
    createMarker([e.latlng.lat, e.latlng.lng])
  }
  //#endregion

  //#region // geocoder (search)
  geoCoder() {
    const geocoder = new Geocoder({ defaultMarkGeocode: false });

    geocoder.addTo(map);

    geocoder.on('markgeocode', (e) => {
      const center = e.geocode.center;
      createMarker([center.lat, center.lng])
    });    
  }
  //#endregion

  //#region // drow polyline events
  startDrawFreePolyline() {
    removeMarker()

    this.removeMarkerListener();
     
    L.DomUtil.addClass(map._container,'crosshair-cursor-enabled');

    L.DomEvent.addListener(map, 'click', this.addDrawFreePolylineListener)
  }

  addDrawFreePolylineListener() {
    isDrawing = !isDrawing;

    if (isDrawing) {
      L.DomEvent.addListener(map, 'mousemove', drawPolyline)
    } else {
      L.DomUtil.removeClass(map._container,'crosshair-cursor-enabled');
      L.DomEvent.removeListener(map, 'mousemove', drawPolyline);
      console.log(latlngs)
    }
  }

  removeDrawFreePolylineListener() {
    removeMarker();

    for(const i in map._layers) (Boolean(map._layers[i]._path)) && map.removeLayer(map._layers[i]);
    
    latlngs = [];

    L.DomEvent.removeListener(map, 'click', this.addDrawFreePolylineListener);

    this.addMarkerListener();
  }  
  //#endregion

}
