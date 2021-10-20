import { Component, NgZone, OnInit } from '@angular/core';

let map: google.maps.Map;
let drawMap: google.maps.Polyline;
let markers: any[] = [];
let destination: any;

@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrls: ['./custom-map.component.css']
})

export class CustomMapComponent implements OnInit {
  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    this.initMap({lat: 30.7865, lng: 31.0004});
  }

  //#region // show map
  initMap(center: any) {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 8,
        center: center        
    });

    map.addListener('click', (e: google.maps.MouseEvent) => {
      const location = {lat: e.latLng.lat(), lng: e.latLng.lng()}
      this.zone.run(() => this.addMarker(location))      
    });

    destination = new google.maps.MVCArray();
    let options = { 
      path: destination,
      clickable: false
    };
    let polyline = new google.maps.Polyline(options);
    polyline.setMap(map)

    /*google.maps.event.addListener(map, 'mousemove', (e) => {
      let currentPath = polyline.getPath();
      currentPath.push(e.latLng)
    })*/

    let move = google.maps.event.addListener(map, 'mousemove', function(e) {
      polyline.getPath().push(e.latLng);
    });    

    google.maps.event.addListenerOnce(map, 'mouseup', (e) => {
      google.maps.event.removeListener(move);
      var path = polyline.getPath();
     /* polyline.setMap(null);
      polyline = new google.maps.Polygon({
        map: map,
        paths: polyline
      }); */     
    })

    this.addMarker(center);

    //this.drawMap();
  }
  //#endregion

  //#region // markers
  drawMarker() {
    markers.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: location,
        map,
        label: "M",
      });

      marker.addListener('click', () => {
        this.removeMarker(index);        
      })

    })
  }

  addMarker(location: google.maps.LatLngLiteral) {
    markers = [
      ...markers,
      location
    ];

    this.drawMarker();
  }

  removeMarker(index: number) {
    markers.splice(index, 1);
    this.initMap({lat: 30.7865, lng: 31.0004});
  }  
  //#endregion

  //#region // drow on map
  drawMap() {
    drawMap.setMap(map)
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

}
