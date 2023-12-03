import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { report } from '../report';
import { ReportService } from '../report.service';
import { Route, Router } from '@angular/router';
import { location } from '../locationObject';

@Component({
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})
export class ReportAddFormComponent implements OnInit{
  reportList:report[] = []
  form:FormGroup
  formControls: any;

  constructor(private reportService:ReportService, private router:Router){
    this.reportList = this.reportService.getReportList()
    let formControls = {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),   
      location: new FormControl('', [
        Validators.required
      ]),
      reporter: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      extra_info: new FormControl('', [
        Validators.required
      ]),
      imageUrl: new FormControl('')
    }
    this.form = new FormGroup(formControls)
  }

  ngOnInit(): void {
    this.reportList = this.reportService.getReportList()
  }

  receiveEmittedLocation(locationChosen: location) {
    console.log('Location received:', locationChosen);
    this.form.patchValue({
      location: locationChosen // Assuming locationName is the property to be displayed
    });
  }

  onSubmit(newReport:any){
    // call the post report service 
    const newRecordCreated = new report(
      newReport.location,
      newReport.name,
      newReport.reporter,
      newReport.extra_info,
      newReport.imageUrl ? newReport.imageUrl : ''
    )
    console.log(newRecordCreated)
    this.reportService.addReport(newRecordCreated)
    // this.locationList.push(newReport.location)
    this.router.navigate(['/reports'])
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({
          imageUrl: reader.result // Update the imageUrl FormControl value
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
