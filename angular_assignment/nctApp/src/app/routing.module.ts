import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportAddFormComponent } from './report-add-form/report-add-form.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { ReportEditComponent } from './report-edit/report-edit.component';

const appRoutes:Routes = [
  // list of path objects 
  {
    path:'reports', 
    component:ReportListComponent
  },
  {
    path:'reports/add',
    component:ReportAddFormComponent
  },
  {
    path:'reports/:reportId',
    component:ReportViewComponent
  },
  {
    path:'reports/edit/:reportId',
    component:ReportEditComponent
  },
  {
    path:'',
    redirectTo:'/reports',
    pathMatch:'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
