import { Pig } from "./Pig";

interface PigServices{
    addPig(pig:Pig):void   // adds a new Pig with a unique pigId
    removePig(pigId:number):void // removes pig with given pigId
}

export class PiggyController implements PigServices{
    pigs:Pig[]

    constructor(){
        // if localStorage for this site is empty
        this.pigs = []
        console.log(Pig.Id);   

        // if localStorage for this site is not empty
        if (localStorage.length > 0){
            var existingData = JSON.parse(localStorage.PigArray);
            for (var i = 0; i < existingData.length; i++){
                this.pigs.push(existingData[i]);
                Pig.Id++;
            }
            console.log(Pig.Id);
        }
    }
    
    addPig(pig: Pig): void {
        this.pigs.push(pig)   // add pig to the array of pigs
        localStorage.PigArray = JSON.stringify(this.pigs)   // update localStorage
        console.log("Pig added with id " + pig.pigId) // for testing
    }

    removePig(pigId: number): void {
        // Retrieve the existing PigArray from localStorage
        const existingPigArray = JSON.parse(localStorage.PigArray);

        // Find the index of the object with the specified pigId
        const indexToDelete = existingPigArray.findIndex((pig:Pig) => 
            pig.pigId == pigId
        );

        // Check if the pigId was found and remove it
        if (indexToDelete != -1) {
            existingPigArray.splice(indexToDelete, 1); // Remove the object at the specified index
            // Update localStorage with the modified PigArray
            localStorage.PigArray = JSON.stringify(existingPigArray);
        } else {
            console.log(`Pig with pigId ${pigId} not found.`);
        }
    }
}