var studentArray = [];  // array of students; initially empty
var numOfEachGrade = [{label:'A+',value:0},{label:'A',value:0},{label:'A-',value:0},{label:'B+',value:0},{label:'B',value:0},{label:'B-',value:0},
    {label:'C+',value:0},{label:'C',value:0},{label:'C-',value:0},{label:'D',value:0},{label:'F',value:0}];   // array to store # of students with specific grades, initially empty
var arrayOfLowerBounds = [100.00, 95.00, 90.00, 85.00, 80.00, 75.00, 70.00, 65.00, 60.00, 55.00, 50.00, 0.00];

function init(){
    // event listener for file input change
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

    handleHistogramChange(); // initial empty histogram
    document.getElementById("value-highest").textContent = "NA (0.00%)";
    document.getElementById("value-lowest").textContent = "NA (0.00%)";
    document.getElementById("value-mean").textContent = "0.00";
    document.getElementById("value-median").textContent = "0.00";

    // event listener for lower bound inputs
    const lowerBoundInputs = document.querySelectorAll('.lb-input input');
    lowerBoundInputs.forEach(input => {
        input.addEventListener('blur', handleLowerBoundChange, false);
    });
}
  
function handleFileSelect(event){
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
}
  
function handleFileLoad(event){
    console.log(event);
    // getting the CSV data from the loaded file
    const csvData = event.target.result;
    // parse the data 
    const data = parseCSV(csvData);

    // filling up the array of Student objects
    for (var i = 0; i < data.length; i++){
        studentArray.push(data[i]);
    }
    // sorting the array of students
    studentArray.sort(function(a, b) {
        return a.Percent - b.Percent;
    });

    numberOfEachGrade();     // find how many students are allocated each of the grades
    highestPercent();     // find the top scorer and their score
    lowestPercent();      // find the lowest scorer and their score
    meanPercent();        // find the mean score of all scores in the .csv file 
    medianPercent();      // find the median score of all scores in the .csv file 
    handleHistogramChange(); // create the histogram
}

function parseCSV(csvData){
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        if (values.length === headers.length) {
            const item = {};
            for (let j = 0; j < headers.length; j++) {
                item[headers[j].trim()] = values[j].trim();
            }
            data.push(item);
        }
    }
    return data;
}

function Student(Name, Percent){
    this.Name = Name;
    this.Percent = Percent;
}

// find the number of each grade in the dataset given the lower bounds
function numberOfEachGrade(){
     // clear previous counts and start fresh
    numOfEachGrade = [{label:'A+',value:0},{label:'A',value:0},{label:'A-',value:0},{label:'B+',value:0},{label:'B',value:0},{label:'B-',value:0},
        {label:'C+',value:0},{label:'C',value:0},{label:'C-',value:0},{label:'D',value:0},{label:'F',value:0}];   
    for (var i = 0; i < studentArray.length; i++){
        var percent = parseFloat(studentArray[i].Percent);  
        if ((percent >= parseFloat(document.getElementById("value-Aplus").value) && percent <= parseFloat(document.getElementById("value-max").value))){
            numOfEachGrade[0].value += 1;   // A+
        }
        else if (percent >= parseFloat(document.getElementById("value-A").value) && percent < parseFloat(document.getElementById("value-Aplus").value)){
            numOfEachGrade[1].value += 1;   // A
        }
        else if (percent >= parseFloat(document.getElementById("value-Aminus").value) && percent < parseFloat(document.getElementById("value-A").value)){
            numOfEachGrade[2].value += 1;  // A-
        }
        else if (percent >= parseFloat(document.getElementById("value-Bplus").value) && percent < parseFloat(document.getElementById("value-Aminus").value)){
            numOfEachGrade[3].value += 1;  // B+
        }
        else if (percent >= parseFloat(document.getElementById("value-B").value) && percent < parseFloat(document.getElementById("value-Bplus").value)){
            numOfEachGrade[4].value += 1;  // B
        }
        else if (percent >= parseFloat(document.getElementById("value-Bminus").value) && percent < parseFloat(document.getElementById("value-B").value)){
            numOfEachGrade[5].value += 1;   // B-
        }
        else if (percent >= parseFloat(document.getElementById("value-Cplus").value) && percent < parseFloat(document.getElementById("value-Bminus").value)){
            numOfEachGrade[6].value += 1;   // C+
        }
        else if (percent >= parseFloat(document.getElementById("value-C").value) && percent < parseFloat(document.getElementById("value-Cplus").value)){
            numOfEachGrade[7].value += 1;   // C
        }
        else if (percent >= parseFloat(document.getElementById("value-Cminus").value) && percent < parseFloat(document.getElementById("value-C").value)){
            numOfEachGrade[8].value += 1;   // C-
        }
        else if (percent >= parseFloat(document.getElementById("value-D").value) && percent < parseFloat(document.getElementById("value-Cminus").value)){
            numOfEachGrade[9].value += 1;    // D 
        }
        else if (percent >= parseFloat(document.getElementById("value-F").value) && percent < parseFloat(document.getElementById("value-D").value)){
            numOfEachGrade[10].value += 1;    // F
        }
        // values that are < bound for grade F || > bound for Max do not get assigned a grade
    }
}

// function to get the highest scorer and their score
function highestPercent(){
    var tempArrayOfStudents = [];

    for (var i = 0; i < studentArray.length; i++) {
        tempArrayOfStudents.push(studentArray[i]);
    }
    var minValue = parseFloat(document.getElementById("value-F").value);
    var maxValue = parseFloat(document.getElementById("value-max").value);

    // Filter the students based on Percent
    tempArrayOfStudents = tempArrayOfStudents.filter(function(student) {
        var percent = parseFloat(student.Percent);
        return (percent >= minValue && percent <= maxValue);
    });

    var highestValue = tempArrayOfStudents[tempArrayOfStudents.length-1];
    document.getElementById("value-highest").textContent = highestValue.Name + " (" + parseFloat(highestValue.Percent).toFixed(2) + "%)";
}

// function to get the lowest scorer and their score
function lowestPercent(){
    var tempArrayOfStudents = [];

    for (var i = 0; i < studentArray.length; i++) {
        tempArrayOfStudents.push(studentArray[i]);
    }
    var minValue = parseFloat(document.getElementById("value-F").value);
    var maxValue = parseFloat(document.getElementById("value-max").value);

    // Filter the students based on Percent
    tempArrayOfStudents = tempArrayOfStudents.filter(function(student) {
        var percent = parseFloat(student.Percent);
        return (percent >= minValue && percent <= maxValue);
    });

    var lowestValue = tempArrayOfStudents[0];
    document.getElementById("value-lowest").textContent = lowestValue.Name + " (" + parseFloat(lowestValue.Percent).toFixed(2) + "%)";
}

// function to get the mean score
function meanPercent() {
    var tempArrayOfStudents = [];

    for (var i = 0; i < studentArray.length; i++) {
        tempArrayOfStudents.push(studentArray[i]);
    }
    var minValue = parseFloat(document.getElementById("value-F").value);
    var maxValue = parseFloat(document.getElementById("value-max").value);

    // Filter the students based on Percent
    tempArrayOfStudents = tempArrayOfStudents.filter(function(student) {
        var percent = parseFloat(student.Percent);
        return (percent >= minValue && percent <= maxValue);
    });
   
    var mean = 0;
    for (var i = 0; i < tempArrayOfStudents.length; i++) {
        mean += parseFloat(tempArrayOfStudents[i].Percent);
    }
    if (tempArrayOfStudents.length > 0) {
        mean = mean / tempArrayOfStudents.length;
    }
    document.getElementById("value-mean").textContent = mean.toFixed(2);
}


// function to get the median score
function medianPercent(){
    var tempArrayOfStudents = [];
    for (var i = 0; i < studentArray.length; i++) {
        tempArrayOfStudents.push(studentArray[i]);
    }
    var minValue = parseFloat(document.getElementById("value-F").value);
    var maxValue = parseFloat(document.getElementById("value-max").value);

    // Filter the students based on Percent
    tempArrayOfStudents = tempArrayOfStudents.filter(function(student) {
        var percent = parseFloat(student.Percent);
        return (percent >= minValue && percent <= maxValue);
    });

    // if the length is even
    if (tempArrayOfStudents.length % 2 == 0) {
        const first = parseFloat(tempArrayOfStudents[tempArrayOfStudents.length / 2 - 1].Percent);
        const second = parseFloat(tempArrayOfStudents[tempArrayOfStudents.length / 2].Percent);
        var median = (first + second)/2;
        document.getElementById("value-median").textContent = median.toFixed(2);
    } else {
        var median = parseFloat(tempArrayOfStudents[Math.floor(tempArrayOfStudents.length / 2)].Percent);
        document.getElementById("value-median").textContent = median.toFixed(2);
    }
}

// function to handle the case where the lower bounds are changed
function handleLowerBoundChange(event){
    event.preventDefault();
    var index = 0;  // by default we assume the max input was changed
    var copyArrayOfLowerBounds = [];

    var targetId = event.target.id;

    // making a copy of the original array of LBs
    for (var i = 0; i < arrayOfLowerBounds.length; i++){
        copyArrayOfLowerBounds[i] = arrayOfLowerBounds[i];
    }

    if (targetId == "value-Aplus"){index = 1} 
    else if (targetId == "value-A"){index = 2} 
    else if (targetId == "value-Aminus"){index = 3} 
    else if (targetId == "value-Bplus"){index = 4} 
    else if (targetId== "value-B"){index = 5} 
    else if (targetId == "value-Bminus"){index = 6} 
    else if (targetId == "value-Cplus"){index = 7} 
    else if (targetId == "value-C"){index = 8} 
    else if (targetId == "value-Cminus"){index = 9} 
    else if (targetId == "value-D"){index = 10}  
    else if (targetId == "value-F"){index = 11}  

    if (parseFloat(event.target.value).toFixed(2) < 0.00 || parseFloat(event.target.value).toFixed(2) > 100.00){
        alert("Invalid, input value must be in range [0-100]! Discarding the input.");
        // change the value back to previous input
        document.getElementById(targetId).value = arrayOfLowerBounds[index];
        return;
    } else{
        copyArrayOfLowerBounds[index] = parseFloat(event.target.value).toFixed(2);
        // check that array of lbs is in descending order
        for (var i = 0; i < copyArrayOfLowerBounds.length; i++){
            if (copyArrayOfLowerBounds[i] <= copyArrayOfLowerBounds[i+1]){
                alert("Lower Bounds should be in descending order, so discarding the input!");
                document.getElementById(targetId).value = arrayOfLowerBounds[index];
                return;
            }
        }

        arrayOfLowerBounds[index] = parseFloat(event.target.value).toFixed(2);  // safe to assign value to original array

        // if in correct order, 
        numberOfEachGrade();   // update numOfEachGrade
        highestPercent();     // find the top scorer and their score
        lowestPercent();      // find the lowest scorer and their score
        meanPercent();        // find the mean score of all scores in the .csv file 
        medianPercent();      // find the median score of all scores in the .csv file 
        handleHistogramChange();   // update histogram using numOfEachGrade
    }
}

// function to create/show changes in the histogram once numOfEachArray is found/re-evaluated
function handleHistogramChange(){  
    const chartBarsContainer = document.querySelector(".chart__bars");
      
    // Making sure the container is empty
    chartBarsContainer.innerHTML = "";
      
    const maxValue = Math.max(...numOfEachGrade.map((i) => i.value));
      
    numOfEachGrade.forEach((elem) => {
        const height = Math.floor((elem.value / maxValue) * 100);
      
        chartBarsContainer.innerHTML += `<div 
              class="chart__bar" 
              data-label="${(elem.label)}" 
              data-value="${elem.value}"
              style="--height: ${height}%"
              tabindex="0"
            >
              <span class="sr-only">${elem.label} - $${elem.value}</span>
            </div>`;
    });  
}

