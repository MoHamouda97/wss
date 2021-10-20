import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import Geocoder from 'leaflet-control-geocoder';
import { LeafletService } from 'src/services/leaflet/leaflet.service';

//#region // props & functions needed to deal wit listeners by ref
let map: any;
let marker: any;
let latlngs: any[] = [];
let recLatLngs: any[] = [];
let circleLatLngs: any = [];
let polygonLatLngs: any = [];
let isDrawing: boolean = false;
let isDrawingRec: boolean = false;
let isDrawingCircle: boolean = false;
let isDrawingPolygon: boolean = false;
let isAddMarker: boolean = true;

function drawPolyline(e: any) {
  latlngs.push([e.latlng.lat, e.latlng.lng]);
  L.polyline(latlngs, {color: '#26abe4'}).addTo(map);
}

function drawRectangle(e: any) {
  recLatLngs.push([e.latlng.lat, e.latlng.lng]);
  L.rectangle(recLatLngs, {color: '#26abe4'}).addTo(map);
}

function drawCircle(e: any) {
  circleLatLngs.push([e.latlng.lat, e.latlng.lng]);
  L.circle([e.latlng.lat, e.latlng.lng], {radius: 50000}).addTo(map);
}

function drawPolygon(e: any) {
  polygonLatLngs.push([e.latlng.lat, e.latlng.lng]);
  L.polygon(polygonLatLngs, {color: '#26abe4'}).addTo(map);
}

function createMarker(center: any) {
  const icon = L.icon({
    iconUrl: './../../assets/map-marker.png',
    iconSize: [25, 40]
  });  
  
  removeMarker()
  
  marker = L.marker(center, { 
    icon: icon,
    draggable: true
  })
  
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
  mapStyles: any[] = [
    {name: 'Streets', url: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'},
    {name: 'Hybrid', url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'},
    {name: 'Satellite', url: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'},
    {name: 'Terrain', url: 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'},
  ];

  stopPolyline: boolean = false;
  stopRec: boolean = false;
  stopPolygon: boolean = false;
  stopCircle: boolean = false;
  
  constructor(private service: LeafletService) { }

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
    
    this.changeMapStyle(this.mapStyles[0]?.url)

    createMarker(center)
    
    this.addMarkerListener();
  }
  //#endregion

  //#region // marker listeners
  addMarkerListener() {
    L.DomEvent.addListener(map, 'click', (e: any) => {
      if (isAddMarker) {
        createMarker([e.latlng.lat, e.latlng.lng]);
        this.getAddress(e.latlng.lat, e.latlng.lng);
        console.log(recLatLngs)
      }
    });
  }

  freezMarkerListener() {
    isAddMarker = false;
    L.DomEvent.removeListener(map, 'click', this.addMarkerListener)
  }
  //#endregion

  //#region // geocoder
  geoCoder() { // search the map
    const geocoder = new Geocoder({ defaultMarkGeocode: false });

    geocoder.addTo(map);

    geocoder.on('markgeocode', (e) => {
      const center = e.geocode.center;
      createMarker([center.lat, center.lng])
    });    
  }

  async getAddress(lat: number, lng: number) { // get address by lat, lng
    const location = await this.service.gatAddress(lat, lng).toPromise();
    console.log(location)
  }  
  //#endregion

  //#region // drow polyline events
  startDrawFreePolyline() {
    removeMarker()

    this.freezMarkerListener();
     
    L.DomUtil.addClass(map._container,'crosshair-cursor-enabled');

    L.DomEvent.addListener(map, 'click', this.addDrawFreePolylineListener);

    L.DomEvent.removeListener(map, 'click', drawRectangle);
    L.DomEvent.removeListener(map, 'click', drawCircle);
    L.DomEvent.removeListener(map, 'click', drawPolygon);
  }

  addDrawFreePolylineListener() {
    isDrawing = !isDrawing;
    isAddMarker = false;

    if (isDrawing) {
      L.DomEvent.addListener(map, 'mousemove', drawPolyline)
    } else {
      L.DomUtil.removeClass(map._container,'crosshair-cursor-enabled');
      L.DomEvent.removeListener(map, 'mousemove', drawPolyline);
    }
  }

  //#endregion

  //#region // draw rectangle
  startDrawRectangle() {
    removeMarker()

    this.freezMarkerListener();
     
    L.DomUtil.addClass(map._container,'crosshair-cursor-enabled');

    this.addDrawRectangleListener()

    L.DomEvent.removeListener(map, 'click', this.addDrawFreePolylineListener);
    L.DomEvent.removeListener(map, 'click', drawCircle);
    L.DomEvent.removeListener(map, 'click', drawPolygon);
  }


  addDrawRectangleListener() {
    isDrawingRec = !isDrawingRec;
    isAddMarker = false;

    if (isDrawingRec) {
      L.DomEvent.addListener(map, 'click', drawRectangle)
    } else {
      L.DomUtil.removeClass(map._container,'crosshair-cursor-enabled');
      L.DomEvent.removeListener(map, 'click', drawRectangle);
    }
  }  
  //#endregion

  //#region // draw circle
  startDrawCircle() {
    removeMarker()

    this.freezMarkerListener();
     
    L.DomUtil.addClass(map._container,'crosshair-cursor-enabled');

    this.addDrawCircleListener();

    L.DomEvent.removeListener(map, 'click', this.addDrawFreePolylineListener);
    L.DomEvent.removeListener(map, 'click', drawRectangle);
    L.DomEvent.removeListener(map, 'click', drawPolygon);
  }

  addDrawCircleListener() {
    isDrawingCircle = !isDrawingCircle;
    isAddMarker = false;

    if (isDrawingCircle) {
      L.DomEvent.addListener(map, 'click', drawCircle)
    } else {
      L.DomUtil.removeClass(map._container,'crosshair-cursor-enabled');
      L.DomEvent.removeListener(map, 'click', drawCircle);
    }
  }  
  //#endregion

  //#region // draw polygon
  startDrawPolygon() {
    removeMarker()

    this.freezMarkerListener();
     
    L.DomUtil.addClass(map._container,'crosshair-cursor-enabled');

    this.addDrawPolygonListener()

    L.DomEvent.removeListener(map, 'click', this.addDrawFreePolylineListener);
    L.DomEvent.removeListener(map, 'click', drawRectangle);
    L.DomEvent.removeListener(map, 'click', drawCircle);
  }

  addDrawPolygonListener() {
    isDrawingPolygon = !isDrawingPolygon;
    isAddMarker = false;

    if (isDrawingPolygon) {
      L.DomEvent.addListener(map, 'click', drawPolygon)
    } else {
      L.DomUtil.removeClass(map._container,'crosshair-cursor-enabled');
      L.DomEvent.removeListener(map, 'click', drawPolygon);
    }
  }  
  //#endregion

  //#region // remove shapes
  removeShapes() {
    removeMarker();

    for(const i in map._layers) (Boolean(map._layers[i]._path)) && map.removeLayer(map._layers[i]);
    
    latlngs = [];
    recLatLngs = [];
    circleLatLngs = [];
    polygonLatLngs = [];

    isDrawing = false;
    isDrawingRec = false;
    isDrawingCircle = false;
    isDrawingPolygon = false;
    isAddMarker = true;

    L.DomEvent.removeListener(map, 'click', this.addDrawFreePolylineListener);
    L.DomEvent.removeListener(map, 'click', drawRectangle);
    L.DomEvent.removeListener(map, 'click', drawCircle);
    L.DomEvent.removeListener(map, 'click', drawPolygon);
    L.DomUtil.removeClass(map._container,'crosshair-cursor-enabled');
  }  
  //#endregion

  //#region // change map style
  changeMapStyle(style: any) {
    const tiles = L.tileLayer(style, {
      maxZoom: 18,
      minZoom: 3,
      subdomains: ['mt0','mt1','mt2','mt3']
    });
    
    tiles.addTo(map); 
  }
  //#endregion
}
