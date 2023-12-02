import { Component, OnInit } from '@angular/core';
import { report } from '../report';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import { location } from '../locationObject';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit{
  locationList:location[]
  reportList:report[]
  query:string

  // initialize vars
  constructor(private reportService:ReportService, private router:Router) {
    this.locationList = reportService.getLocationList()
    this.reportList = reportService.getReportList()
    console.log(this.reportList)
    this.query = ''
  }

  // calculations & processing done here 
  ngOnInit(): void {
    this.reportList = this.reportService.getReportList()
  }

  showStuff(report_Id:number){
    this.router.navigate(['/reports', report_Id])    // activated route
  }

  promptForPassword():string | null {
    const password = prompt('Please enter the password to delete (case-sensitive):');
    return password
  }

  // delete the report 
  async deleteReport(report_Id:number){
    var passwordEntered = this.promptForPassword()
    const recordDeleted = await this.reportService.deleteReportEntry(report_Id, passwordEntered)
    if (recordDeleted){
      this.reportList = this.reportList.filter((rep:report) => rep.reportId != report_Id)
      console.log(`Alert from reportService: Report with id ${report_Id} got deleted!`)
    }
    else{
      alert("Report deletion failed!")
    }
  }
}
