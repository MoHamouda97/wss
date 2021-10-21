import { Component, NgZone, OnInit } from '@angular/core';

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

//#region // drawing
function drawPolyline(e: any) {
  polyline.getPath().push(e.latLng);
}
//#endregion

//#region // marker actions
function createMarker(center: google.maps.LatLng | google.maps.LatLngLiteral) {    
  const marker = new google.maps.Marker({
    position: center,
    map,
  });

  const index = markers.length

  markers.push(marker)

  marker.addListener('click', (e) => {
    removeMarker(index)
  })

}

function removeAllMarkers(map: google.maps.Map | null) {
  if (Boolean(markers)) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }    
    markers = [];
  }
}

function removeMarker(index: number) {
  markers.forEach((val, i) => (i == index) && markers[i].setMap(null));
}
//#endregion

@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrls: ['./custom-map.component.css']
})

export class CustomMapComponent implements OnInit {
  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    this.initMap({lat: 30.7865, lng: 31.0004});
    this.drawingManager();
  }

  //#region // show map
  initMap(center: any) {
    map = new google.maps.Map(document.getElementById('g_map') as HTMLElement, {
        zoom: 8,
        center: center        
    });

    map.addListener('click', (e: google.maps.MouseEvent) => {
      const location = {lat: e.latLng.lat(), lng: e.latLng.lng()}
      this.zone.run(() => (isAddMarker) && createMarker(location))      
    });

    createMarker(center);
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
        this.initMap({lat: lat, lng: lng})
      })
    });
  }
  //#endregion  

  //#region // drow polyline events
  startDrawFreePolyline() {
    isAddMarker = false;

    removeAllMarkers(null);

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

  rectangelListener(e: any) {
    removeAllMarkers(null);
    console.log(e)
  }

  polygonListener(e: any) {
    removeAllMarkers(null);
    console.log(e)
  }

  circlelListener(e: any) {
    removeAllMarkers(null);
    console.log(e)
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
    drawingManager.setDrawingMode(null);

    google.maps.event.removeListener(polylineListener);
    (Boolean(polyline)) && polyline.setMap(null)
    polyline = [];

    overlays.forEach((val, i) => overlays[i].overlay.setMap(null))

    overlays = [];

  }
  //#endregion


}
