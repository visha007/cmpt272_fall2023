import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../report.service';
import { report } from '../report';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent{
  @Output() editRep = new EventEmitter()

  // listOfReports:report
  fetchedReport: report | undefined;
  rId:number = this.activatedRoute.snapshot.params['reportId']
  constructor(private activatedRoute:ActivatedRoute, private reportService:ReportService, private router:Router){
  }

  // send Id for the report that needs to be edited
  sendReportId(evt:any,reportId:number){
    evt['edit_reportId'] = reportId
    this.editRep.emit(evt)
    this.router.navigate(['/reports/edit/:'+reportId])
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
