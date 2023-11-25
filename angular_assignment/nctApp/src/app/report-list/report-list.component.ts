import { Component } from '@angular/core';
import { report } from '../report';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent {
  reportList:report[]
  constructor() {
    this.reportList = [
      {
        location: "Metrotown Station A",
        baddie_name: "BaddieA",
        time_reported: (new Date()).getTime(),
        status: 'RESOLVED'
      },
      {
        location: "Metrotown Station B",
        baddie_name: "BaddieB",
        time_reported: (new Date()).getTime(),
        status: 'OPEN'
      },
      {
        location: "Metrotown Station C",
        baddie_name: "BaddieC",
        time_reported: (new Date()).getTime(),
        status: 'RESOLVED'
      },
      {
        location: "Metrotown Station D",
        baddie_name: "BaddieD",
        time_reported: (new Date()).getTime(),
        status: 'OPEN'
      },
      {
        location:"Metrotown Station E",
        baddie_name: "BaddieE",
        time_reported: (new Date()).getTime(),
        status: 'RESOLVED'
      }
    ]
  }
}
