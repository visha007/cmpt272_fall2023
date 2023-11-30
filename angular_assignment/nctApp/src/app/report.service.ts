import { Injectable } from '@angular/core';
import { report } from './report';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reportList:report[] = []
  highestIdValue = 0
  constructor(private httpClient: HttpClient) {
    // get the array of reports from backend
    this.httpClient.get('https://272.selfip.net/apps/dAlgytMzgI/collections/reportList/documents/').subscribe((data) =>{ 
      var getRes = <Array<any>>data;
      console.log(getRes)
  
      if (getRes.length > 0){
        for (var i = 0; i < getRes.length; i++){
          const newRecord = new report(
            getRes[i].data.location,   
            getRes[i].data.name,
            getRes[i].data.reporter,
            getRes[i].data.extra_info,
            getRes[i].data.imageUrl ? getRes[i].data.imageUrl : ''
          )
          newRecord.reportId = getRes[i].key
          newRecord.status = getRes[i].data.status
          newRecord.time_reported = getRes[i].data.timeReported
          this.reportList.push(newRecord)
        }
        this.highestIdValue = this.reportList[this.reportList.length-1].reportId
      }
      console.log(`The current highest reportId val is: ${this.highestIdValue}`)
    }
    )
  }

  getReportList():report[]{
    return this.reportList;
  }
  
  // add new report to the data table and to the storage server
  addReport(newReport:report):void{
    newReport.reportId = ++this.highestIdValue;
    const postData = {
      key: newReport.reportId.toString(), // reportId is unique and can be used as key
      data: {
        location: newReport.location,
        name: newReport.baddie_name,
        reporter: newReport.reporter_name,
        extra_info: newReport.extra_info,
        imageUrl: newReport.image,  // Add imageUrl if available
        timeReported:newReport.time_reported.toString(),
        status:newReport.status,
      }
    }
    this.httpClient.post('https://272.selfip.net/apps/dAlgytMzgI/collections/reportList/documents/', postData).subscribe(data => {
      console.log(data)
      this.reportList.push(newReport)
     }
    )
  }

  // delete the report 
  deleteReportEntry(report_Id:number):void{
    // delete call to remove report from storage server 
    this.httpClient.delete('https://272.selfip.net/apps/dAlgytMzgI/collections/reportList/documents/' + report_Id + '/')
      .subscribe(
        (data) => {    // if the call is a success, data printed should be null
          console.log(data)
        }
      )
  }
}
