import { Component, EventEmitter, Input, Output } from '@angular/core';
import { report } from '../report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  report:report
  constructor(){
    this.report = {
      location: "Metrotown Station A",
      baddie_name: "BaddieA",
      time_reported: (new Date()).getTime(),
      status: 'RESOLVED'
    }
  }
}
