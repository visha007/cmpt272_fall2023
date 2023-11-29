import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { report } from '../report';
// import defaultImage from 'assets/default_img.png'
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})
export class ReportAddFormComponent {
  form:FormGroup
  formControls: any;

  constructor(){
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

  onSubmit(newReport:report){
    console.log(newReport)
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
