import { location } from "./locationObject"

export class report{
    reportId:number   
    location:location   
    baddie_name:string    
    time_reported:number   // assigned automatically   -- send
    status:string         // assigned automatically     -- send
    reporter_name:string   
    extra_info:string
    image?:string   // optional attr for image upload    
    showDetails?: boolean; // Make sure to add '?' to make it optional

    constructor(location:location, baddie_name:string, reporter_name:string,
        extra_info:string, uploadedImage?:string){
        this.reportId = this.generateUniqueNumericID()
        this.location = location
        this.baddie_name = baddie_name
        this.status = 'OPEN',
        this.time_reported = (new Date()).getTime()
        this.reporter_name = reporter_name
        this.extra_info = extra_info
        this.image = uploadedImage,
        this.showDetails = false
    }

    generateUniqueNumericID(): number {
        const min = 100000000; // Minimum 9-digit number (100,000,000)
        const max = 999999999; // Maximum 9-digit number (999,999,999)
        
        const uniqueID = Math.floor(Math.random() * (max - min + 1)) + min; // Generate random number within the range
        
        return uniqueID;
    }  
}