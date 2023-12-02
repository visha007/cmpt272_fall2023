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
  locationList:location[]
  form:FormGroup
  formControls: any;

  constructor(private reportService:ReportService, private router:Router){
    this.locationList = this.reportService.getLocationList()
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
    this.locationList = this.reportService.getLocationList()
  }

  receiveEmittedLocation(locationChosen: location) {
    console.log('Location received:', locationChosen);
    
    // Assuming 'locationName' is the property to be displayed in the dropdown
    const selectedLocation = locationChosen.locationName; 
  
    // Find the location object from the list based on the selectedLocation
    const foundLocation = this.locationList.find(loc => loc.locationName === selectedLocation);
  
    if (foundLocation) {
      this.form.patchValue({
        location: foundLocation // Patch only the locationName
      });
    }
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
