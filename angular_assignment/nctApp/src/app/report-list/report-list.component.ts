import { Component, OnInit } from '@angular/core';
import { report } from '../report';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit{
  reportList:report[]
  query:string

  // initialize vars
  constructor(private reportService:ReportService, private router:Router) {
    this.reportList = reportService.getReportList()
    console.log(this.reportList)
    this.query = ''
  }

  // calculations & processing done here 
  ngOnInit(): void {
    this.reportList = this.reportService.getReportList()
  }

  showStuff(evt:any, report_Id:number){
    console.log(evt)
    this.router.navigate(['/reports', report_Id])    // activated route
  }

  // delete the report 
  deleteReport(evt:any, report_Id:number){
    console.log(evt)
    this.reportService.deleteReportEntry(report_Id)
    this.reportList = this.reportList.filter((rep:report) => rep.reportId != report_Id)
    console.log(`Alert from reportService: Report with id ${report_Id} got deleted!`)
  }
}
