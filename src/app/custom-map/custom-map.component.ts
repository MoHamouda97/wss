import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import * as world from './../../assets/world.json';

let map: google.maps.Map;

let markers: google.maps.Marker[] = [];
let isAddMarker: boolean = true;

let drawingManager = new google.maps.drawing.DrawingManager();
let isDrawing: boolean = false;
let polylineListener: any;
let polyline: any;
let polylineMove: any;
let destination: any;
let overlays: any[] = [];

const latLangs: any = world;

//#region // drawing
function drawPolyline(e: any) {
  polyline.getPath().push(e.latLng);
}
//#endregion

//#region markers functions
function removeAllMarkers(map: google.maps.Map | null) {
  if (Boolean(markers)) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }    
    markers = [];
  }
}

function showMarkersInside(type: string, shape: any) {
  switch(type) {
    case 'poly' :
      markers.forEach(
        (val, index) => {
          const location: any = markers[index].getPosition();
          (google.maps.geometry.poly.containsLocation(location, shape)) && markers[index].setVisible(true)
        }
      );         
      break;
    default :
      markers.forEach(
        (val, index) => (shape.getBounds().contains(markers[index].getPosition())) && markers[index].setVisible(true)
      );
      break;
  }
}
//#endregion

@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrls: ['./custom-map.component.css']
})

export class CustomMapComponent implements OnInit {

  constructor(private zone: NgZone, private http: HttpClient) { }

  ngOnInit(): void {
    const areas = latLangs.world.map((val: any) => {
      return {
        lat: parseFloat(val["lat"]),
        lng: parseFloat(val["lng"])
      }
    });
    
    this.initMap(areas);
    console.log(areas)
    //https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json
  }

  //#region // show map
  initMap(center: any[]) {
    map = new google.maps.Map(document.getElementById('g_map') as HTMLElement, {
        zoom: 8,
        center: center[0]        
    });

    map.addListener('click', (e: google.maps.MouseEvent) => {
      const location = {lat: e.latLng.lat(), lng: e.latLng.lng()}
      this.zone.run(() => (isAddMarker) && this.createMarker(location, true))      
    });

    center.forEach(val => this.createMarker(val));

    this.drawingManager();
  }
  //#endregion

  //#region // marker actions
  createMarker(center: google.maps.LatLng | google.maps.LatLngLiteral, isShowMarker: boolean = false) {    
    const marker: any = new google.maps.Marker({
      position: center,
      map,
    });

    const index = markers.length;

    (isShowMarker) ? marker.setVisible(true) : marker.setVisible(false);

    markers.push(marker);

    marker.addListener('click', (e: any) => {
      this.showMarkerPopup(marker)
    })

    //this.getAddress(center)
  }

  removeMarker(index: number) {
    markers.forEach((val, i) => (i == index) && markers[i].setMap(null));
  }

  hideAllMarkers() {
    markers.forEach((val, index) => markers[index].setVisible(false))
  }

  showMarkerPopup(marker: google.maps.Marker) {
    const contentString = `
    <div style="text-align: center">
      <img src="https://via.placeholder.com/150" />
      <br>
      <p>content HERE!!</p>
    </div>
    `
    
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    }); 
    
    infowindow.open(map, marker)   
  }
  //#endregion

  //#region // search map
  searchMap(search: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': search}, (result, status) => {

      this.zone.run(() => {
        const lat = result[0].geometry.location.lat();
        const lng = result[0].geometry.location.lng();
        
        markers = [];
        this.initMap([{lat: lat, lng: lng}])
      })
    });
  }

  getAddress(latlang: any) {
    const geocoder = new google.maps.Geocoder();
    console.log(location)
    geocoder.geocode({'location': latlang}, (result) => {
      console.log(result)
    })
  }
  //#endregion  

  //#region // drow polyline events
  startDrawFreePolyline() {
    isAddMarker = false;

    drawingManager.setDrawingMode(null);

    destination = new google.maps.MVCArray();

    let options = { 
      path: destination,
      clickable: false
    };

    polyline = new google.maps.Polyline(options);
    polyline.setMap(map);    

    polylineListener = google.maps.event.addListener(map, 'click', this.addDrawFreePolylineListener);

    map.setOptions({draggableCursor: 'crosshair'});
  }

  addDrawFreePolylineListener() {
    isDrawing = !isDrawing;

    if (isDrawing) {
      polylineMove = google.maps.event.addListener(map, 'mousemove', drawPolyline)
    } else {
      google.maps.event.addListenerOnce(map, 'mousemove', (e) => {
        google.maps.event.removeListener(polylineMove);
        const path = polyline.getPath();
        showMarkersInside('poly', polyline);
      });

      map.setOptions({draggableCursor: ''});      
    }
  }
  //#endregion

  //#region // drawing manager
  drawingManager() {
    drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
    });
  
    drawingManager.setMap(map); 

    google.maps.event.addListener(drawingManager, 'rectanglecomplete', this.rectangelListener);
    google.maps.event.addListener(drawingManager, 'polygoncomplete', this.polygonListener);
    google.maps.event.addListener(drawingManager, 'circlecomplete', this.circlelListener);

    this.completeDrawingListener();
   
  }

  rectangelListener(shape: any) {
    showMarkersInside('', shape);
  }

  polygonListener(shape: any) {
    showMarkersInside('poly', shape);
  }

  circlelListener(shape: any) {
    showMarkersInside('', shape);
  }

  completeDrawingListener() {
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (e) => {
      overlays.push(e);
     (e.type != google.maps.drawing.OverlayType.MARKER) && drawingManager.setDrawingMode(null);
    });     
  }

  //#endregion

  //#region // remove shapes
  removeShapes() {
    this.hideAllMarkers();

    isAddMarker = true;
    isDrawing = false;

    drawingManager.setDrawingMode(null);

    overlays.forEach((val, i) => overlays[i].overlay.setMap(null))

    overlays = [];    

    google.maps.event.removeListener(polylineListener);
    if (Boolean(polyline)) {
      polyline.setMap(null);
      polyline = [];
    } 
  }
  //#endregion
}
