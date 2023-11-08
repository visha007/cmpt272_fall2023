System.register(["./Pig", "./PigController"], function (exports_1, context_1) {
    "use strict";
    var Pig_1, PigController_1, nameExists, heightExists, weightExists, personalityExists, categoryExists, breedExists, languageExists, pigController, existingData, i, blackPigs, whitePigs, greyPigs, chestnutPigs, valuesArray, form, addBtn, cancelBtn, submitBtn, piggoName, piggoHeight, piggoWeight, piggoPersonality, piggoCategory, piggoBreed, piggoStrengthAbility, piggoRunningAbility, piggoSwimmingAbility, piggoLanguageAbility, piggoBreedLabel, piggoStrengthLabel, piggoRunningLabel, piggoSwimmingLabel, piggoLanguageLabel, moreInfoContainer;
    var __moduleName = context_1 && context_1.id;
    // function to dynamically add a new row when a pig is added 
    function addRowToTable(newPig) {
        var table = document.getElementById("pig_table");
        var newRow = document.createElement("tr");
        var nameCell = document.createElement("td");
        var categoryCell = document.createElement("td");
        var moreInfoCell = document.createElement("td");
        var deletePigCell = document.createElement("td");
        // creating the corresponding buttons for "More Info" and "Delete"
        var moreInfoBtn = document.createElement("button");
        var deleteBtn = document.createElement("button");
        // append buttons
        moreInfoCell.append(moreInfoBtn);
        deletePigCell.append(deleteBtn);
        // append text values
        nameCell.innerHTML = newPig.pigName;
        categoryCell.innerHTML = newPig.pigCategory;
        moreInfoBtn.className = "moreInfo";
        moreInfoBtn.textContent = "More Info";
        moreInfoBtn.addEventListener("click", function () {
            // show piggy info code 
            var moreInfoTable = document.createElement("table");
            var nameRow = document.createElement("tr");
            var breedRow = document.createElement("tr");
            var heightRow = document.createElement("tr");
            var weightRow = document.createElement("tr");
            var uniqueAbilityRow = document.createElement("tr");
            var personalityRow = document.createElement("tr");
            var nameLabelCell = document.createElement("td");
            var breedLabelCell = document.createElement("td");
            var heightLabelCell = document.createElement("td");
            var weightLabelCell = document.createElement("td");
            var uniqueAbilityLabelCell = document.createElement("td");
            var personalityLabelCell = document.createElement("td");
            var nameValueCell = document.createElement("td");
            var breedValueCell = document.createElement("td");
            var heightValueCell = document.createElement("td");
            var weightValueCell = document.createElement("td");
            var uniqueAbilityValueCell = document.createElement("td");
            var personalityValueCell = document.createElement("td");
            nameLabelCell.textContent = "Name";
            breedLabelCell.textContent = "Breed";
            heightLabelCell.textContent = "Height";
            weightLabelCell.textContent = "Weight";
            if (newPig.pigCategory === "Black") {
                uniqueAbilityLabelCell.textContent = "Strength";
            }
            else if (newPig.pigCategory === "White") {
                uniqueAbilityLabelCell.textContent = "Running";
            }
            else if (newPig.pigCategory === "Grey") {
                uniqueAbilityLabelCell.textContent = "Swimming";
            }
            else if (newPig.pigCategory === "Chestnut") {
                uniqueAbilityLabelCell.textContent = "Language";
            }
            personalityLabelCell.textContent = "Personality";
            nameValueCell.innerHTML = newPig.pigName;
            breedValueCell.innerHTML = newPig.pigBreed;
            heightValueCell.innerHTML = newPig.pigHeight;
            weightValueCell.innerHTML = newPig.pigWeight;
            uniqueAbilityValueCell.innerHTML = newPig.pigUniqueAbility;
            personalityValueCell.innerHTML = newPig.pigPersonality;
            // append everything to the rows 
            nameRow.append(nameLabelCell);
            nameRow.append(nameValueCell);
            breedRow.append(breedLabelCell);
            breedRow.append(breedValueCell);
            heightRow.append(heightLabelCell);
            heightRow.append(heightValueCell);
            weightRow.append(weightLabelCell);
            weightRow.append(weightValueCell);
            uniqueAbilityRow.append(uniqueAbilityLabelCell);
            uniqueAbilityRow.append(uniqueAbilityValueCell);
            personalityRow.append(personalityLabelCell);
            personalityRow.append(personalityValueCell);
            // append everything to the table
            moreInfoTable.append(nameRow);
            moreInfoTable.append(breedRow);
            moreInfoTable.append(heightRow);
            moreInfoTable.append(weightRow);
            moreInfoTable.append(uniqueAbilityRow);
            moreInfoTable.append(personalityRow);
            // append the new table to the more info table container
            moreInfoContainer.innerHTML = "";
            moreInfoContainer.appendChild(moreInfoTable);
            // toggle the visibility of the container and its contents 
            if (moreInfoContainer.style.display == "none") {
                moreInfoContainer.style.display = "block";
            }
            else {
                moreInfoContainer.style.display = "none";
            }
        });
        deleteBtn.className = "deletePig";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function (event) {
            var _a;
            // Get the row to be deleted and its associated pig_Id
            var target = event.target;
            var parentRow = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
            var pigId = parentRow.getAttribute("pig_Id");
            if (!pigId) {
                console.error("Could not find 'pig_Id' attribute for the row.");
                return;
            }
            var userConfirmation = window.confirm("Please confirm: Are you sure about the deletion?");
            if (userConfirmation) {
                console.log("User chose to proceed!");
                // Call the removePig method from PiggyController to remove the pig
                if (pigId) {
                    pigController.removePig(parseInt(pigId));
                }
                // Remove the row from the table
                parentRow.remove();
            }
            else {
                console.log("User clicked cancel or closed the dialog box!");
            }
        });
        // append everything to the new row created
        newRow.append(nameCell);
        newRow.append(categoryCell);
        newRow.append(moreInfoCell);
        newRow.append(deletePigCell);
        newRow.setAttribute("pig_Id", newPig.pigId.toString());
        table.append(newRow);
    }
    return {
        setters: [
            function (Pig_1_1) {
                Pig_1 = Pig_1_1;
            },
            function (PigController_1_1) {
                PigController_1 = PigController_1_1;
            }
        ],
        execute: function () {
            nameExists = false;
            heightExists = false;
            weightExists = false;
            personalityExists = false;
            categoryExists = false;
            breedExists = false;
            languageExists = false;
            pigController = new PigController_1.PiggyController();
            existingData = JSON.parse(localStorage.PigArray);
            if (existingData.length > 0) {
                for (i = 0; i < existingData.length; i++) {
                    addRowToTable(existingData[i]); // add the exisitng data to the table
                }
            }
            // sort the array of contents into Black, White, Grey, Chestnut - not traditional sort
            blackPigs = [];
            whitePigs = [];
            greyPigs = [];
            chestnutPigs = [];
            valuesArray = [];
            /*if (existingData.length > 0){
                var keys = Object.keys(localStorage);
                var key = keys[0]
                console.log(JSON.parse(localStorage[keys[0]]))
                /*for (var i = 0; i < keys.length; i++){
                    var key = keys[i];
                    valuesArray[i] = JSON.parse(localStorage[key]);
                    console.log(valuesArray[i]);
                }*/
            //}
            // buttons and form
            form = document.getElementById("addPiggyForm"); // Define the 'form' variable
            addBtn = document.getElementById("addPig");
            cancelBtn = document.getElementById("cancelChanges");
            submitBtn = document.getElementById("submitBtn");
            // form inputs
            piggoName = document.getElementById("piggyName");
            piggoHeight = document.getElementById("piggyHeight");
            piggoWeight = document.getElementById("piggyWeight");
            piggoPersonality = document.getElementById("piggyPersonality");
            piggoCategory = document.getElementById("piggyCategory");
            piggoBreed = document.getElementById("piggyBreed");
            piggoStrengthAbility = document.getElementById("piggyStrength");
            piggoRunningAbility = document.getElementById("piggyRunning");
            piggoSwimmingAbility = document.getElementById("piggySwimming");
            piggoLanguageAbility = document.getElementById("piggyLanguage");
            // if (!nameExists || !heightExists || !weightExists || !personalityExists || !categoryExists || !breedExists || !languageExists)
            // labels for extra attributes
            piggoBreedLabel = document.getElementById("breed_label");
            piggoStrengthLabel = document.getElementById("strength_label");
            piggoRunningLabel = document.getElementById("run_label");
            piggoSwimmingLabel = document.getElementById("swim_label");
            piggoLanguageLabel = document.getElementById("lang_label");
            // table container for "More Info" table
            moreInfoContainer = document.getElementById("moreInfoContainer");
            // when the "Add Pig" button is clicked...
            addBtn.addEventListener("click", function () {
                form.style.display = "block";
                cancelBtn.style.display = "block";
            });
            // when the cancel button is clicked...
            cancelBtn.addEventListener("click", function () {
                form.style.display = "none";
                cancelBtn.style.display = "none";
            });
            // event listener for the "Category" dropdown
            piggoCategory.addEventListener("change", function (event) {
                const result = event.target;
                if (result.value === 'Black') {
                    piggoBreed.style.display = "block";
                    piggoStrengthAbility.style.display = "block"; // only 
                    piggoLanguageAbility.style.display = "none";
                    piggoSwimmingAbility.style.display = "none";
                    piggoRunningAbility.style.display = "none";
                    // show and hide labels
                    piggoBreedLabel.style.display = "block";
                    piggoStrengthLabel.style.display = "block";
                    piggoLanguageLabel.style.display = "none";
                    piggoSwimmingLabel.style.display = "none";
                    piggoRunningLabel.style.display = "none";
                }
                else if (result.value === 'Chestnut') {
                    piggoBreed.style.display = "block";
                    piggoLanguageAbility.style.display = "block"; // only 
                    piggoStrengthAbility.style.display = "none";
                    piggoSwimmingAbility.style.display = "none";
                    piggoRunningAbility.style.display = "none";
                    // show and hide labels
                    piggoBreedLabel.style.display = "block";
                    piggoLanguageLabel.style.display = "block"; // only 
                    piggoStrengthLabel.style.display = "none";
                    piggoSwimmingLabel.style.display = "none";
                    piggoRunningLabel.style.display = "none";
                }
                else if (result.value === 'Grey') {
                    piggoBreed.style.display = "block";
                    piggoSwimmingAbility.style.display = "block"; // only
                    piggoLanguageAbility.style.display = "none";
                    piggoStrengthAbility.style.display = "none";
                    piggoRunningAbility.style.display = "none";
                    // show and hide labels
                    piggoBreedLabel.style.display = "block";
                    piggoSwimmingLabel.style.display = "block"; // only
                    piggoLanguageLabel.style.display = "none";
                    piggoStrengthLabel.style.display = "none";
                    piggoRunningLabel.style.display = "none";
                }
                else if (result.value === 'White') {
                    piggoBreed.style.display = "block";
                    piggoRunningAbility.style.display = "block"; // only
                    piggoSwimmingAbility.style.display = "none";
                    piggoLanguageAbility.style.display = "none";
                    piggoStrengthAbility.style.display = "none";
                    // show and hide labels
                    piggoBreedLabel.style.display = "block";
                    piggoRunningLabel.style.display = "block"; // only
                    piggoSwimmingLabel.style.display = "none";
                    piggoLanguageLabel.style.display = "none";
                    piggoStrengthLabel.style.display = "none";
                }
                else { // no category was selected
                    piggoBreed.style.display = "none";
                    piggoRunningAbility.style.display = "none";
                    piggoSwimmingAbility.style.display = "none";
                    piggoLanguageAbility.style.display = "none";
                    piggoStrengthAbility.style.display = "none";
                    // show and hide labels
                    piggoBreedLabel.style.display = "none";
                    piggoRunningLabel.style.display = "none";
                    piggoSwimmingLabel.style.display = "none";
                    piggoLanguageLabel.style.display = "none";
                    piggoStrengthLabel.style.display = "none";
                }
            });
            // take table inputs and create a new row with "More Details" and "Delete" buttons
            submitBtn.addEventListener("click", function () {
                // create a Pig object and add it using pigController
                if (piggoCategory.value === 'Black') {
                    var name = piggoName.value;
                    var height = piggoHeight.value;
                    var weight = piggoWeight.value;
                    var personality = piggoPersonality.value;
                    var breed = piggoBreed.value;
                    var category = piggoCategory.value;
                    var uniqueAbility = piggoStrengthAbility.value;
                    // add a new Pig to the pigs array
                    var newBlackPig = new Pig_1.Pig(name, height, weight, personality, category, breed, uniqueAbility);
                    console.log(newBlackPig);
                    pigController.addPig(newBlackPig);
                    // add pig to table
                    addRowToTable(newBlackPig);
                }
                else if (piggoCategory.value === 'White') {
                    var name = piggoName.value;
                    var height = piggoHeight.value;
                    var weight = piggoWeight.value;
                    var personality = piggoPersonality.value;
                    var breed = piggoBreed.value;
                    var category = piggoCategory.value;
                    var uniqueAbility = piggoRunningAbility.value;
                    var newWhitePig = new Pig_1.Pig(name, height, weight, personality, category, breed, uniqueAbility);
                    console.log(newWhitePig);
                    pigController.addPig(newWhitePig);
                    // add pig to table
                    addRowToTable(newWhitePig);
                }
                else if (piggoCategory.value === 'Grey') {
                    var name = piggoName.value;
                    var height = piggoHeight.value;
                    var weight = piggoWeight.value;
                    var personality = piggoPersonality.value;
                    var breed = piggoBreed.value;
                    var category = piggoCategory.value;
                    var uniqueAbility = piggoSwimmingAbility.value;
                    var newGreyPig = new Pig_1.Pig(name, height, weight, personality, category, breed, uniqueAbility);
                    console.log(newGreyPig);
                    pigController.addPig(newGreyPig);
                    // add pig to table
                    addRowToTable(newGreyPig);
                }
                else if (piggoCategory.value === 'Chestnut') {
                    var name = piggoName.value;
                    var height = piggoHeight.value;
                    var weight = piggoWeight.value;
                    var personality = piggoPersonality.value;
                    var breed = piggoBreed.value;
                    var category = piggoCategory.value;
                    var uniqueAbility = piggoLanguageAbility.value;
                    var newChestnutPig = new Pig_1.Pig(name, height, weight, personality, category, breed, uniqueAbility);
                    console.log(newChestnutPig);
                    pigController.addPig(newChestnutPig);
                    // add pig to table
                    addRowToTable(newChestnutPig);
                }
            });
        }
    };
});
