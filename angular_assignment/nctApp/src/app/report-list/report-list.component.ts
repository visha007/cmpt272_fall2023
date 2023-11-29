import { Component, OnInit } from '@angular/core';
import { report } from '../report';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit{
  reportList:report[]
  query:string

  // initialize vars
  constructor(private reportService:ReportService) {
    this.reportList = []
    this.query = ''
  }

  // calculations done here 
  ngOnInit(): void {
    this.reportList = this.reportService.getReport()
  }

  showStuff(evt:any){
    console.log(evt);
    this.reportService.getReport();
  }

  // delete the report 
  deleteReport(evt:any, report_Id:number){
    console.log(evt)
    this.reportList = this.reportList.filter((rep:report) => rep.reportId != report_Id)
    console.log(`Report with id ${report_Id} got deleted!`)
    return this.reportList
  }
}
