export class Pig{
    static Id = 0
    pigId:number
    pigName:string
    pigHeight:string
    pigWeight:string
    pigPersonality:string
    pigCategory:string
    pigBreed:string
    pigUniqueAbility:string

    constructor(pigName:string, pigHeight:string, pigWeight:string, pigPersonality:string, pigCategory:string,
        pigBreed:string, pigUniqueAbility:string){  
        this.pigId = Pig.Id
        Pig.Id++   // give each new pig a unique ID 
        this.pigName = pigName
        this.pigHeight = pigHeight
        this.pigWeight = pigWeight
        this.pigPersonality = pigPersonality
        this.pigCategory = pigCategory
        this.pigBreed = pigBreed
        this.pigUniqueAbility = pigUniqueAbility
    }
}