System.register([], function (exports_1, context_1) {
    "use strict";
    var PiggyController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PiggyController = class PiggyController {
                constructor() {
                    this.pigs = [];
                }
                addPig(pig) {
                    this.pigs.push(pig); // add pig to the array of pigs
                    localStorage.PigArray = JSON.stringify(this.pigs); // update localStorage
                    console.log("Pig added with id " + pig.pigId); // for testing
                }
                removePig(pigId) {
                    this.pigs = this.pigs.filter((piggy) => {
                        piggy.pigId != pigId;
                    });
                    localStorage.PigArray = JSON.stringify(this.pigs);
                }
            };
            exports_1("PiggyController", PiggyController);
        }
    };
});
