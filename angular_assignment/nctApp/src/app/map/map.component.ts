import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { location } from '../locationObject';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
import { ReportService } from '../report.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png'
const iconUrl = 'assets/marker-icon.png'
const shadowUrl = 'assets/marker-shadow.png'
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
Marker.prototype.options.icon = iconDefault

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{
  private map!: L.Map
  @Output() locationEmitter = new EventEmitter()

  constructor(private reportService:ReportService){}

  ngOnInit(): void {
    this.showMap()
  }

  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);   //  in setView(long, lat, zoom)

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);

    L.marker([49.2276, -123.0076]).addTo(this.map)   // lat, long then add to map
    .bindPopup("<b>Metrotown</b><br>Cases reported.").openPopup()
  }

  onMapClick(e:any) {
    this.map.on('click', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      this.reportService.getReverseGeocode(lat, lng).subscribe((data: any) => {
        const locationName = data.display_name;
        console.log(`Latitude: ${lat}, Longitude: ${lng}, Location: ${locationName}`);

      // emit the value for addReportComponent to listen for
      const locationCreated = new location(
        lat.toString(),
        lng.toString(),
        locationName
      )
      this.locationEmitter.emit(locationCreated); 
      });
    });
  }
}



