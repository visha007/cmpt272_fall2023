import { Pig } from "./Pig";

interface PigServices{
    addPig(pig:Pig):void   // adds a new Pig with a unique pigId
    removePig(pigId:number):void // removes pig with given pigId
}

export class PiggyController implements PigServices{
    pigs:Pig[]

    constructor(){
        this.pigs = []
    }
    
    addPig(pig: Pig): void {
        this.pigs.push(pig)   // add pig to the array of pigs
        localStorage.PigArray = JSON.stringify(this.pigs)   // update localStorage
        console.log("Pig added with id " + pig.pigId) // for testing
    }

    removePig(pigId: number): void {
        this.pigs = this.pigs.filter((piggy) => {    // filter out the element to be deleted
            piggy.pigId != pigId
        })   
        localStorage.PigArray = JSON.stringify(this.pigs);
    }
}