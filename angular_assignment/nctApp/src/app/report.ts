export class report{
    static reportId = 0
    reportId:number   
    location:string   
    baddie_name:string    
    time_reported:number   // assigned automatically   -- send
    status:string         // assigned automatically     -- send
    reporter_name:string   
    extra_info:string    
    image?:string   // optional attr for image upload    
    showDetails?: boolean; // Make sure to add '?' to make it optional

    constructor(location:string, baddie_name:string, reporter_name:string,
        extra_info:string, uploadedImage?:string){
        this.reportId = report.reportId
        report.reportId++  // gives the next report a different Id 
        this.location = location
        this.baddie_name = baddie_name
        this.status = 'OPEN',
        this.time_reported = (new Date()).getTime()
        this.reporter_name = reporter_name
        this.extra_info = extra_info
        this.image = uploadedImage,
        this.showDetails = false
    }
}