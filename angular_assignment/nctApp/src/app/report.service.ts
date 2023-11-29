import { Injectable } from '@angular/core';
import { report } from './report';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reportList:report[] = []
  constructor(private httpClient: HttpClient) {
    // get the array of reports from backend
    this.httpClient.get('https://272.selfip.net/apps/dAlgytMzgI/collections/reportList/documents/')
    .subscribe((data) =>{
      var rows = <Array<any>>data;
      console.log(rows)
    })
  }

  getReport(){
    console.log(this.reportList)
    return this.reportList;
  }
  
  // add new report to the data table and to the storage server
  addReport(newReport:report){
    // newReport.time_reported = (new Date()).getTime()
    this.reportList.push(newReport)
    console.log(this.reportList)
  }

  // delete the report 
  deleteReportEntry(report_Id:number){
    this.reportList = this.reportList.filter((rep:report) => rep.reportId != report_Id)
    console.log(`Alert from reportService: Report with id ${report_Id} got deleted!`)
    return this.reportList
  }
}
