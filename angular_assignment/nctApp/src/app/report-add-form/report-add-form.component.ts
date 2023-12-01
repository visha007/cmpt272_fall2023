import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { report } from '../report';
// import defaultImage from 'assets/default_img.png'
import { ReportService } from '../report.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})
export class ReportAddFormComponent {
  form:FormGroup
  formControls: any;

  constructor(private reportService:ReportService, private router:Router){
    const imageUrl = 'assets/default_img.png'
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
