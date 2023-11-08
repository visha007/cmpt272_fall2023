System.register([], function (exports_1, context_1) {
    "use strict";
    var Pig;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Pig = class Pig {
                constructor(pigName, pigHeight, pigWeight, pigPersonality, pigCategory, pigBreed, pigUniqueAbility) {
                    this.pigId = Pig.Id;
                    Pig.Id++; // give each new pig a unique ID 
                    this.pigName = pigName;
                    this.pigHeight = pigHeight;
                    this.pigWeight = pigWeight;
                    this.pigPersonality = pigPersonality;
                    this.pigCategory = pigCategory;
                    this.pigBreed = pigBreed;
                    this.pigUniqueAbility = pigUniqueAbility;
                }
            };
            exports_1("Pig", Pig);
            Pig.Id = 0;
        }
    };
});
