import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { location } from '../locationObject';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
import { ReportService } from '../report.service';
import { report } from '../report';
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
  @Input() receivedLoc:any
  reportList:report[] = []

  constructor(private reportService:ReportService){
    this.initializeComponent();
  }

  async ngOnInit(): Promise<void> {
    await this.fetchReportList();
    this.showMap();
    this.addMarker();
  }

  async initializeComponent(): Promise<void> {
    try {
      this.reportList = await this.reportService.getReportListAsync();
      this.loadReportList();
    } catch (error) {
      console.error('Error initializing component:', error);
      // Handle error here if needed
    }
  }

  async fetchReportList(): Promise<void> {
    this.reportList = await this.reportService.getReportListAsync();
  }

  async loadReportList(): Promise<void> {
    try {
      this.reportList = await this.reportService.getReportListAsync();
      this.addMarker();
    } catch (error) {
      console.error('Error loading report list:', error);
      // Handle error here if needed
    }
  }
  
  addMarker() {
    if (this.map && this.reportList.length > 0) {
      // Create an object to store the count of OPEN reports for each location
      const openReportCountByLocation: { [key: string]: number } = {};
  
      // Calculate the count of OPEN reports for each location
      this.reportList.forEach((report) => {
        if (report.status === 'OPEN') {
          const locationKey = `${report.location.latitude}_${report.location.longitude}`;
  
          if (openReportCountByLocation[locationKey]) {
            openReportCountByLocation[locationKey]++;
          } else {
            openReportCountByLocation[locationKey] = 1;
          }
        }
      });
  
      // Create markers and bind popups with the count of OPEN reports for each location
      for (let i = 0; i < this.reportList.length; i++) {
        const report = this.reportList[i];
        const lat = parseFloat(report.location.latitude);
        const lng = parseFloat(report.location.longitude);
        const locationKey = `${lat}_${lng}`;
  
        const openReportCount = openReportCountByLocation[locationKey] || 0;
  
        const marker = L.marker([lat, lng])
          .addTo(this.map)
          .bindPopup(
            `<strong>${report.location.locationName}</strong><br>OPEN Reports: ${openReportCount}`
          );
  
        marker.openPopup();
      }
    }
  }  
  
  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);

    this.map.on('moveend', () => {
      const { lat, lng } = this.map.getCenter();
      const zoom = this.map.getZoom();
      localStorage.setItem('mapState', JSON.stringify({ lat, lng, zoom }));
    });

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
    }).addTo(this.map);
  }

  onMapClick(evt:any) {
    this.map.on('click', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      this.reportService.getReverseGeocode(lat, lng).subscribe((data: any) => {
        const locationName = data.display_name;
        // console.log(`Latitude: ${lat}, Longitude: ${lng}, Location: ${locationName}`);

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