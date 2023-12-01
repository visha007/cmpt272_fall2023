import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';
import { report } from '../report';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent{
  // listOfReports:report
  fetchedReport: report | undefined;
  rId:number = this.activatedRoute.snapshot.params['reportId']
  constructor(private activatedRoute:ActivatedRoute, private reportService:ReportService){
  }

  ngOnInit(): void {
    this.reportService.fetchReport(this.rId).subscribe(
      (data: any) => {
        console.log(data)

        this.fetchedReport = new report(
          data.data.location,   
          data.data.name,
          data.data.reporter,
          data.data.extra_info,
          data.data.imageUrl ? data.data.imageUrl : ''
        )
        this.fetchedReport.reportId = data.key
        this.fetchedReport.status = data.data.status
        this.fetchedReport.time_reported = data.data.timeReported
      }
    );
  }
}
