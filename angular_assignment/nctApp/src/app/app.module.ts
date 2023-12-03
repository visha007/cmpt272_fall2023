import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportComponent } from './report/report.component';
import { ReportAddFormComponent } from './report-add-form/report-add-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { ReportViewComponent } from './report-view/report-view.component';
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
    ReportComponent,
    ReportAddFormComponent,
    ReportViewComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
