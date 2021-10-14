import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})
export class GMapComponent implements OnInit {
  // copy map from AGM
  map: any;
  mapClickListener: any; 
  map2: any;
  mapClickListener2: any; 

  // zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 30.7865;
  lng: number = 31.0004;

  // list of markers
  markers: any[] = [
	  {
		  lat: 30.7865,
		  lng: 31.0004,
		  label: 'A',
		  draggable: true
	  }
  ];

  // access google map API
  geocoder = new google.maps.Geocoder();

  // drawing on map
  managerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ['polygon']
    },
    polygonOptions: {
      draggable: true,
      editable: true,
      geodesic: true,
    },
    drawingMode: "polygon"
  };  

  drawingControlOptions: google.maps.drawing.DrawingControlOptions = {
    position: google.maps.ControlPosition.TOP_CENTER,
    drawingModes: [
      google.maps.drawing.OverlayType.POLYLINE,
    ],
  };

  polylineOptions: any = {
    clickable: true,
    editable: true,
    draggable: true,
    zIndex: 1,
  }  

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    this.initMap()
  }

  //#region // map functions
  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => this.mapClicked(e.latLng.lat(), e.latLng.lng()))      
    });
  } 

  mapClicked(lat: any, lng: any) {
    this.markers = [
      ...this.markers,
      {
        lat: lat,
        lng: lng,
        draggable: true
      }      
    ]
  }   
  //#endregion

  //#region // marker function
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  markerDragEnd(m: any, $event: any) {
    console.log('dragEnd', m, $event);
  } 
  
  removeMarker(index: number) {
    this.markers.splice(index, 1);
  }
  //#endregion

  //#region // search map
  searchMap(search: string) {
    this.geocoder.geocode({'address': search}, (result, status) => {

      this.zone.run(() => {
        this.lat = result[0].geometry.location.lat();
        this.lng = result[0].geometry.location.lng();
        
        this.markers = [];
        this.mapClicked(this.lat, this.lng)
      })
    });
  }
  //#endregion
  
  test($event: google.maps.Polyline) {
    console.log($event.getPath().getArray()[0].lat())
    console.log($event.getPath().getArray()[0].lng())
  }

  initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: {
          lat: 30.7865,
          lng: 31.0004,
        },
        zoom: 8,
      }
    );
  
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYLINE,
        ],
      },
      markerOptions: {
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      },
      circleOptions: {
        fillColor: "#ffff00",
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1,
      },
    });
  
    drawingManager.setMap(map);

    /*this.map2 = map;
    this.mapClickListener2 = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => this.mapClicked(e.latLng.lat(), e.latLng.lng()))      
    });*/    
  }  
}
