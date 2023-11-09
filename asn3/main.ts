import { Pig } from "./Pig";
import { PiggyController } from "./PigController";

// sort the array of contents into Black, White, Grey, Chestnut - not traditional sort
var blackPigs:Pig[] = [];
var whitePigs:Pig[] = [];
var greyPigs:Pig[] = [];
var chestnutPigs:Pig[] = [];
var sortedPigs:Pig[] = [];

// buttons and form
var form = document.getElementById("addPiggyForm"); // Define the 'form' variable
var addBtn = document.getElementById("addPig") as HTMLButtonElement;
var cancelBtn = document.getElementById("cancelChanges") as HTMLButtonElement;
var submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;

// form inputs
var piggoName = document.getElementById("piggyName") as HTMLTextAreaElement;

var piggoHeight = document.getElementById("piggyHeight") as HTMLTextAreaElement;
var piggoWeight = document.getElementById("piggyWeight") as HTMLTextAreaElement; 

var piggoRealHeight = document.getElementById("piggyHeightValue") as HTMLTextAreaElement;
var piggoRealWeight = document.getElementById("piggyWeightValue") as HTMLTextAreaElement;

piggoRealHeight.value = piggoHeight.value;
piggoRealWeight.value = piggoWeight.value;

piggoHeight.addEventListener("input", function(){
    piggoRealHeight.value = piggoHeight.value;
});

piggoWeight.addEventListener("input", function(){
    piggoRealWeight.value = piggoWeight.value;
});

piggoRealHeight.addEventListener("input", function(){
    piggoHeight.value = piggoRealHeight.value;
});

piggoRealWeight.addEventListener("input", function(){
    piggoWeight.value = piggoRealWeight.value;
});

var piggoPersonality = document.getElementById("piggyPersonality") as HTMLTextAreaElement;
var piggoCategory = document.getElementById("piggyCategory") as HTMLTextAreaElement;
var piggoBreed = document.getElementById("piggyBreed") as HTMLTextAreaElement;

var piggoStrengthAbility = document.getElementById("piggyStrength") as HTMLTextAreaElement;
var piggoRunningAbility = document.getElementById("piggyRunning") as HTMLTextAreaElement;
var piggoSwimmingAbility = document.getElementById("piggySwimming") as HTMLTextAreaElement;

var piggoStrengthRealAbility = document.getElementById("piggyStrengthValue") as HTMLTextAreaElement;
var piggoRunningRealAbility = document.getElementById("piggyRunningValue") as HTMLTextAreaElement;
var piggoSwimmingRealAbility = document.getElementById("piggySwimmingValue") as HTMLTextAreaElement;

piggoStrengthRealAbility.value = piggoStrengthAbility.value;
piggoRunningRealAbility.value = piggoRunningAbility.value;
piggoSwimmingRealAbility.value = piggoSwimmingAbility.value;

piggoStrengthAbility.addEventListener("input", function(){
    piggoStrengthRealAbility.value = piggoStrengthAbility.value;
});

piggoRunningAbility.addEventListener("input", function(){
    piggoRunningRealAbility.value = piggoRunningAbility.value;
});

piggoSwimmingAbility.addEventListener("input", function(){
    piggoSwimmingRealAbility.value = piggoSwimmingAbility.value;
});

///

piggoStrengthRealAbility.addEventListener("input", function(){
    piggoStrengthAbility.value = piggoStrengthRealAbility.value;
});

piggoRunningRealAbility.addEventListener("input", function(){
    piggoRunningAbility.value = piggoRunningRealAbility.value;
});

piggoSwimmingRealAbility.addEventListener("input", function(){
    piggoSwimmingAbility.value = piggoSwimmingRealAbility.value;
});

var piggoLanguageAbility = document.getElementById("piggyLanguage") as HTMLTextAreaElement;

// labels for extra attributes
var piggoBreedLabel = document.getElementById("breed_label") as HTMLTextAreaElement;
var piggoStrengthLabel = document.getElementById("strength_label") as HTMLTextAreaElement;
var piggoRunningLabel = document.getElementById("run_label") as HTMLTextAreaElement;
var piggoSwimmingLabel = document.getElementById("swim_label") as HTMLTextAreaElement;
var piggoLanguageLabel = document.getElementById("lang_label") as HTMLTextAreaElement;

// table container for "More Info" table
var moreInfoContainer = document.getElementById("moreInfoContainer");

// when the "Add Pig" button is clicked...
addBtn!.addEventListener("click", function(){
    form!.style.display = "block"
    cancelBtn!.style.display = "block"
});

// when the cancel button is clicked...
cancelBtn!.addEventListener("click", function(){
    form!.style.display = "none"
    cancelBtn!.style.display = "none"
});

var pigController = new PiggyController();
// if localStorage for this site is not empty
if (localStorage.length > 0){
    var existingData = JSON.parse(localStorage.PigArray);
    for (var i = 0; i < existingData.length; i++){
        addRowToTable(existingData[i]); // add the existing data to the table
    }
    // sort pigs
    sortPigsByCategory();
    updateTable(sortedPigs);
}

// categorize the pigs by Category then sort pigs in each category by name
function sortPigsByCategory(){
    var existingData = JSON.parse(localStorage.PigArray);
    for (var i = 0; i < existingData.length; i++){
        if (existingData[i].pigCategory == "Black"){
            blackPigs.push(existingData[i]);
        } else if (existingData[i].pigCategory == "White"){
            whitePigs.push(existingData[i]);
        } else if (existingData[i].pigCategory == "Grey"){
            greyPigs.push(existingData[i]);
        } else if (existingData[i].pigCategory == "Chestnut"){
            chestnutPigs.push(existingData[i]);
        }
    }
    blackPigs.sort(sortPigsByNames);
    whitePigs.sort(sortPigsByNames);
    chestnutPigs.sort(sortPigsByNames);
    greyPigs.sort(sortPigsByNames);
    sortedPigs = blackPigs.concat(chestnutPigs, greyPigs, whitePigs);
}


function updateTable(sortedPigs: Pig[]) {
    var table = document.getElementById("pig_table") as HTMLTableElement;
    // table!.innerHTML = ""; // Clear the table content

    // Clear all rows except the first one (column names)
    for (var i = table!.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    for (var i = 0; i < sortedPigs.length; i++){
        var key = sortedPigs[i];
        addRowToTable(key);
    }
}

function sortPigsByNames(pig1: Pig, pig2: Pig){
    if (pig1.pigName > pig2.pigName){
        return 1;
    } else if (pig1.pigName < pig2.pigName){
        return -1;
    } else {
        return 0;
    }
}

// event listener for the "Category" dropdown
piggoCategory.addEventListener("change", function(event){
    const result = event.target as HTMLSelectElement;
    if (result.value === 'Black'){
        piggoBreed.style.display = "block"
        piggoStrengthAbility.style.display = "block"  // only 
        piggoStrengthRealAbility.style.display = "block"
        piggoRunningRealAbility.style.display = "none"
        piggoSwimmingRealAbility.style.display = "none"
        piggoLanguageAbility.style.display = "none"
        piggoSwimmingAbility.style.display = "none"
        piggoRunningAbility.style.display = "none"

        // show and hide labels
        piggoBreedLabel.style.display = "block"
        piggoStrengthLabel.style.display = "block"
        piggoLanguageLabel.style.display = "none"
        piggoSwimmingLabel.style.display = "none"
        piggoRunningLabel.style.display = "none"
    }
    else if (result.value === 'Chestnut'){
        piggoBreed.style.display = "block"
        piggoLanguageAbility.style.display = "block" // only 
        piggoStrengthAbility.style.display = "none"  
        piggoSwimmingAbility.style.display = "none"
        piggoRunningAbility.style.display = "none"
        piggoStrengthRealAbility.style.display = "none"
        piggoRunningRealAbility.style.display = "none"
        piggoSwimmingRealAbility.style.display = "none"

        // show and hide labels
        piggoBreedLabel.style.display = "block"
        piggoLanguageLabel.style.display = "block" // only 
        piggoStrengthLabel.style.display = "none"  
        piggoSwimmingLabel.style.display = "none"
        piggoRunningLabel.style.display = "none"
    }
    else if (result.value === 'Grey'){
        piggoBreed.style.display = "block"
        piggoSwimmingAbility.style.display = "block" // only
        piggoLanguageAbility.style.display = "none"
        piggoStrengthAbility.style.display = "none"
        piggoRunningAbility.style.display = "none"
        piggoStrengthRealAbility.style.display = "none"
        piggoRunningRealAbility.style.display = "none"
        piggoSwimmingRealAbility.style.display = "block"

        // show and hide labels
        piggoBreedLabel.style.display = "block"
        piggoSwimmingLabel.style.display = "block" // only
        piggoLanguageLabel.style.display = "none"
        piggoStrengthLabel.style.display = "none"
        piggoRunningLabel.style.display = "none"
    }
    else if (result.value === 'White'){
        piggoBreed.style.display = "block"
        piggoRunningAbility.style.display = "block" // only
        piggoSwimmingAbility.style.display = "none"
        piggoLanguageAbility.style.display = "none"
        piggoStrengthAbility.style.display = "none"
        piggoStrengthRealAbility.style.display = "none"
        piggoRunningRealAbility.style.display = "block"
        piggoSwimmingRealAbility.style.display = "none"

        // show and hide labels
        piggoBreedLabel.style.display = "block"
        piggoRunningLabel.style.display = "block" // only
        piggoSwimmingLabel.style.display = "none"
        piggoLanguageLabel.style.display = "none"
        piggoStrengthLabel.style.display = "none"
    }
    else{   // no category was selected
        piggoBreed.style.display = "none"
        piggoRunningAbility.style.display = "none"
        piggoSwimmingAbility.style.display = "none"
        piggoLanguageAbility.style.display = "none"
        piggoStrengthAbility.style.display = "none"

        // show and hide labels
        piggoBreedLabel.style.display = "none"
        piggoRunningLabel.style.display = "none" 
        piggoSwimmingLabel.style.display = "none"
        piggoLanguageLabel.style.display = "none"
        piggoStrengthLabel.style.display = "none"
    }
});

// function to dynamically add a new row when a pig is added 
function addRowToTable(newPig:Pig){
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
    nameCell.innerHTML = newPig.pigName
    categoryCell.innerHTML = newPig.pigCategory

    moreInfoBtn.className = "moreInfo";
    moreInfoBtn.textContent = "More Info";
    moreInfoBtn.addEventListener("click", function(){
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
        if (newPig.pigCategory === "Black"){
            uniqueAbilityLabelCell.textContent = "Strength";
        } else if(newPig.pigCategory === "White"){
            uniqueAbilityLabelCell.textContent = "Running";
        } else if (newPig.pigCategory === "Grey"){
            uniqueAbilityLabelCell.textContent = "Swimming";
        } else if (newPig.pigCategory === "Chestnut"){
            uniqueAbilityLabelCell.textContent = "Language"
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
        moreInfoContainer!.innerHTML = "";
        moreInfoContainer!.appendChild(moreInfoTable);

        // toggle the visibility of the container and its contents 
        if (moreInfoContainer!.style.display == "none"){
            moreInfoContainer!.style.display = "block";
        }else{
            moreInfoContainer!.style.display = "none";
        }       
    });

    deleteBtn.className = "deletePig"
    deleteBtn.textContent = "Delete"
    deleteBtn.addEventListener("click", function (event) {
        // Get the row to be deleted and its associated pig_Id
        var target = event.target as HTMLButtonElement;
        var parentRow = target.parentElement!.parentElement as HTMLTableRowElement;
        console.log(parentRow);
        var pigId = parentRow.getAttribute("pig_Id");
    
        if (!pigId) {
            console.error("Could not find 'pig_Id' attribute for the row.");
            return;
        }
    
        var userConfirmation = window.confirm("Please confirm: Are you sure about the deletion?");
        if (userConfirmation) {
            console.log("User chose to proceed!");

            console.log(parseInt(pigId));
    
            // Call the removePig method from PiggyController to remove the pig
            if (pigId) {
                pigController.removePig(parseInt(pigId));
            }
    
            // Remove the row from the table
            parentRow.remove();
        } else {
            console.log("User clicked cancel or closed the dialog box!");
        }
    });
    
    // append everything to the new row created
    newRow.append(nameCell);
    newRow.append(categoryCell);
    newRow.append(moreInfoCell);
    newRow.append(deletePigCell);
    newRow.setAttribute("pig_Id", newPig.pigId.toString());
    table!.append(newRow);
}

// take table inputs and create a new row with "More Details" and "Delete" buttons
submitBtn!.addEventListener("click", function(){
    // create a Pig object and add it using pigController
    if (piggoCategory.value === 'Black'){
        var name = piggoName.value
        var height = piggoHeight.value
        var weight = piggoWeight.value
        var personality = piggoPersonality.value
        var breed = piggoBreed.value
        var category = piggoCategory.value
        var uniqueAbility = piggoStrengthAbility.value

        // add a new Pig to the pigs array
        var newBlackPig = new Pig(name, height, weight, personality, category, breed, uniqueAbility)
        console.log(newBlackPig)
        pigController.addPig(newBlackPig)

        // add pig to table
        addRowToTable(newBlackPig)
    }
    else if (piggoCategory.value === 'White'){
        var name = piggoName.value
        var height = piggoHeight.value
        var weight = piggoWeight.value
        var personality = piggoPersonality.value
        var breed = piggoBreed.value
        var category = piggoCategory.value
        var uniqueAbility = piggoRunningAbility.value
    
        var newWhitePig = new Pig(name, height, weight, personality, category, breed, uniqueAbility)
        console.log(newWhitePig)
        pigController.addPig(newWhitePig)

        // add pig to table
        addRowToTable(newWhitePig)
    }
    else if (piggoCategory.value === 'Grey'){
        var name = piggoName.value
        var height = piggoHeight.value
        var weight = piggoWeight.value
        var personality = piggoPersonality.value
        var breed = piggoBreed.value
        var category = piggoCategory.value
        var uniqueAbility = piggoSwimmingAbility.value
    
        var newGreyPig = new Pig(name, height, weight, personality, category, breed, uniqueAbility)
        console.log(newGreyPig)
        pigController.addPig(newGreyPig)

        // add pig to table
        addRowToTable(newGreyPig)
    }
    else if (piggoCategory.value === 'Chestnut'){
        var name = piggoName.value
        var height = piggoHeight.value
        var weight = piggoWeight.value
        var personality = piggoPersonality.value
        var breed = piggoBreed.value
        var category = piggoCategory.value
        var uniqueAbility = piggoLanguageAbility.value
    
        var newChestnutPig = new Pig(name, height, weight, personality, category, breed, uniqueAbility)
        console.log(newChestnutPig)
        pigController.addPig(newChestnutPig)

        // add pig to table
        addRowToTable(newChestnutPig)
    }
})


