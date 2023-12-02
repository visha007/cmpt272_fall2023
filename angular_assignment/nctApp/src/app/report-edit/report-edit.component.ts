import { Component } from '@angular/core';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent {
  editReportId:number
  constructor(){
    this.editReportId = 0
  }

  editReport(evt:any){
    
  }
}
