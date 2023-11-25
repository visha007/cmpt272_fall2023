export class report{
    location:string
    baddie_name:string
    time_reported:number
    status:string

    constructor(location:string, baddie_name:string, time_reported:number, status:string){
        this.location = location
        this.baddie_name = baddie_name
        this.time_reported = time_reported
        this.status = status
    }
}