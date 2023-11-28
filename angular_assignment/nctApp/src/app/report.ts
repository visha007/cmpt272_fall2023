export class report{
    static reportId = 0
    reportId:number
    location:string
    baddie_name:string
    time_reported:number
    status:string

    constructor(location:string, baddie_name:string, time_reported:number, status:string){
        this.reportId = report.reportId
        report.reportId++  // gives the next report a different Id 
        this.location = location
        this.baddie_name = baddie_name
        this.time_reported = time_reported
        this.status = status
    }
}