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
  reportList:report[] = []
  query:string

  // initialize vars
  constructor(private reportService:ReportService, private router:Router) {
    // this.reportList = reportService.getReportList()
    this.query = ''
    this.initializeComponent()
    console.log(this.reportList)
  }

  // calculations & processing done here 
  ngOnInit(): void {
    // this.reportList = this.reportService.getReportList()
    this.initializeComponent()
    this.sortReportsByTimeReported();
  }

  async initializeComponent(): Promise<void> {
    try {
      this.reportList = await this.reportService.getReportListAsync();
      // this.loadReportList();
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }

  showStuff(report_Id:number){
    this.router.navigate(['/reports', report_Id])    // activated route
  }

  promptForPassword():string | null {
    const password = prompt('Please enter the password to delete (case-sensitive):');
    return password
  }

  // delete the report 
  async deleteReport(report_Id:number):Promise<void>{
    var passwordEntered = this.promptForPassword()
    const recordDeleted = await this.reportService.deleteReportEntry(report_Id, passwordEntered)
    if (recordDeleted){
      this.reportList = this.reportList.filter((rep:report) => rep.reportId != report_Id)
      console.log(`Alert from reportService: Report with id ${report_Id} got deleted!`)
      window.location.reload()
    }
    else{
      alert("Report deletion failed!")
    }
  }
  
  sortReportsByTimeReported() {
    // sorting the data table by TimeReported
    this.reportList.sort((a, b) => {
      const dateA = new Date(a.baddie_name);
      const dateB = new Date(b.baddie_name);
      return dateA.getTime() - dateB.getTime();
    });
  }
}
