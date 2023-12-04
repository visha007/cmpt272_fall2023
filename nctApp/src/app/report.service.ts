import { Injectable } from '@angular/core';
import { report } from './report';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { location } from './locationObject';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  private readonly NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2';
  locationList:location[] = []
  reportList:report[] = []
  highestIdValue = 0
  constructor(private httpClient: HttpClient) {
    // get the array of reports from backend
    this.getReportListAsync()
  }

  getReportList():report[]{
    return this.reportList;
  }

  getLocationList():location[]{
    return this.locationList;
  }

  // fetch report by its key
  fetchReport(reportId: number): Observable<report> {
    return this.httpClient.get<report>('https://272.selfip.net/apps/dAlgytMzgI/collections/reportList/documents/' + reportId + '/');
  }

  async getReportListAsync(): Promise<report[]> {
    try {
      const data = await this.httpClient
        .get('https://272.selfip.net/apps/dAlgytMzgI/collections/reportList/documents/')
        .toPromise();
  
      const getRes = data as Array<any>;
      const reportList: report[] = [];
  
      if (getRes.length > 0) {
        for (let i = 0; i < getRes.length; i++) {
          const newRecord = new report(
            getRes[i].data.location,
            getRes[i].data.name,
            getRes[i].data.reporter,
            getRes[i].data.extra_info,
            getRes[i].data.imageUrl ? getRes[i].data.imageUrl : ''
          );
          newRecord.reportId = getRes[i].key;
          newRecord.status = getRes[i].data.status;
          newRecord.time_reported = getRes[i].data.timeReported;
          reportList.push(newRecord);
        }
      }
  
      return reportList;
    } catch (error) {
      console.error('Error occurred while fetching report list:', error);
      throw error;
    }
  }  

  // add new report to the data table and to the storage server
  addReport(newReport:report):void{
    const postData = {
      key: newReport.reportId.toString(), // reportId is unique and can be used as key
      data: {
        location: {
          latitude:newReport.location.latitude,
          longitude:newReport.location.longitude,
          locationName:newReport.location.locationName
        },
        name: newReport.baddie_name,
        reporter: newReport.reporter_name,
        extra_info: newReport.extra_info,
        imageUrl: newReport.image,  // Add imageUrl if available
        timeReported:newReport.time_reported.toString(),
        status:newReport.status,
      }
    }
    this.httpClient.post('https://272.selfip.net/apps/dAlgytMzgI/collections/reportList/documents/', postData).subscribe(data => {
      console.log(data)
      this.reportList.push(newReport)
     }
    )
  }

  // delete the report 
  deleteReportEntry(report_Id: number, password: string | null): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let entrydeleted = false;
      if (this.verifyPassword(password)) {
        this.httpClient.delete('https://272.selfip.net/apps/dAlgytMzgI/collections/reportList/documents/' + report_Id + '/')
          .subscribe(
            () => {
              entrydeleted = true;
              resolve(entrydeleted);
            }
          );
      } else {
        reject(entrydeleted);
      }
    });
  }

  // call to change the status of the report
  editReportEntry(editReport:report, password: string | null) : Promise<boolean>{
    return new Promise((resolve, reject) => {
      let entryEdited = false;
      if (this.verifyPassword(password)) {
      const putData = {
        key: editReport.reportId.toString(), // reportId is unique and can be used as key
        data: {
          location: {
            latitude:editReport.location.latitude,
            longitude:editReport.location.longitude,
            locationName:editReport.location.locationName
          },
          name: editReport.baddie_name,
          reporter: editReport.reporter_name,
          extra_info: editReport.extra_info,
          imageUrl: editReport.image,  // Add imageUrl if available
          timeReported:editReport.time_reported.toString(),
          status:editReport.status,
        }
      }
      this.httpClient.put('https://272.selfip.net/apps/dAlgytMzgI/collections/reportList/documents/' + editReport.reportId + '/', putData)
        .subscribe((data) =>{ 
          var getRes = <Array<any>>data;
          entryEdited = true
          resolve(entryEdited);
          console.log(entryEdited)
          console.log(getRes)
        })
      }
      else {
        reject(entryEdited);
      }
    }
    )
  }
  
  
  // hashes the password and matches it to the hash provided
  verifyPassword(inputPassword: string | null): boolean {
    if (inputPassword == null){
      return false
    }
    const hardcodedMD5Hash = 'fcab0453879a2b2281bc5073e3f5fe54';
    const hashedPassword = CryptoJS.MD5(inputPassword).toString();
  
    return hashedPassword === hardcodedMD5Hash;
  }

  getReverseGeocode(lat: number, lng: number) {
    const url = `${this.NOMINATIM_URL}&lat=${lat}&lon=${lng}`;
    return this.httpClient.get(url);
  }
}

