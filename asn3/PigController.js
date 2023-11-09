System.register(["./Pig"], function (exports_1, context_1) {
    "use strict";
    var Pig_1, PiggyController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Pig_1_1) {
                Pig_1 = Pig_1_1;
            }
        ],
        execute: function () {
            PiggyController = class PiggyController {
                constructor() {
                    // if localStorage for this site is empty
                    this.pigs = [];
                    console.log(Pig_1.Pig.Id);
                    // if localStorage for this site is not empty
                    if (localStorage.length > 0) {
                        var existingData = JSON.parse(localStorage.PigArray);
                        for (var i = 0; i < existingData.length; i++) {
                            this.pigs.push(existingData[i]);
                            Pig_1.Pig.Id++;
                        }
                        console.log(Pig_1.Pig.Id);
                    }
                }
                addPig(pig) {
                    this.pigs.push(pig); // add pig to the array of pigs
                    localStorage.PigArray = JSON.stringify(this.pigs); // update localStorage
                    console.log("Pig added with id " + pig.pigId); // for testing
                }
                removePig(pigId) {
                    // Retrieve the existing PigArray from localStorage
                    const existingPigArray = JSON.parse(localStorage.PigArray);
                    // Find the index of the object with the specified pigId
                    const indexToDelete = existingPigArray.findIndex((pig) => pig.pigId == pigId);
                    // Check if the pigId was found and remove it
                    if (indexToDelete != -1) {
                        existingPigArray.splice(indexToDelete, 1); // Remove the object at the specified index
                        // Update localStorage with the modified PigArray
                        localStorage.PigArray = JSON.stringify(existingPigArray);
                    }
                    else {
                        console.log(`Pig with pigId ${pigId} not found.`);
                    }
                }
            };
            exports_1("PiggyController", PiggyController);
        }
    };
});
