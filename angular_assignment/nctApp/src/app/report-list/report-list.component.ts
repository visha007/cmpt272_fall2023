import { Component } from '@angular/core';
import { report } from '../report';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent {
  reportList:report[] = []
  constructor() {
    var newReport1 = new report("LocationA", "BaddieA", (new Date()).getTime(), 'RESOLVED')
    var newReport2 = new report("LocationB", "BaddieB", (new Date()).getTime(), 'RESOLVED')
    var newReport3 = new report("LocationC", "BaddieC", (new Date()).getTime(), 'RESOLVED')

    this.reportList.push(newReport1)
    this.reportList.push(newReport2)
    this.reportList.push(newReport3)
  }

  // add new report to the data table and to the storage server
  addReport(newReport:report){
    this.reportList.push(newReport)
  }

  // delete the report
  deleteReport(evt:any, report_Id:number){
    console.log(evt)
    this.reportList = this.reportList.filter((rep:report) => rep.reportId != report_Id)
    console.log(`Report with id ${report_Id} got deleted!`)
    return this.reportList
  }
}
