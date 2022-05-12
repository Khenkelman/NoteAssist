// Initializing variables and array of "categories". The whole setup of the site works based on what position of the array you are on, which goes -1 or +1 position if you click the respective arrows on the webpage. The JSON entries have which category they go in listed in the file. You can see your current category above the search bar
var categorySelected = 0;
var categoryCurrent = "Telehealth";
var savedText = "";
const categories = ["Telehealth","Presentation","Symptoms","Diagnoses","Disruption","Safety","Topics","Stage","Interventions","Response","Strengths","Progress","Tasks"];

//#############################################//
//#############    MAIN BODY    ###############//
//#############################################//

//________________JSON Call____________________//
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
  var testData = JSON.parse(xhttp.responseText);
    
//______Printing Checkboxes inside 'Divs'______//
  var output = '';
  for(var i = 0; i < testData.length; i++){
        output += '<div id="' + i + '" value="' + testData[i].Output + '"><input type="checkbox" id="' + (i+1000) + '"onclick= getCheckboxValue() Desc="' + testData[i].Description + '" value="' + testData[i].Output + '">' + testData[i].Title + "</br><br></div>"; 
  }
  document.getElementById('boxes').innerHTML = output; 
}};    

//____________End JSON Call____________________//
xhttp.open("GET", "data.json", true);
xhttp.send();

// Updates Title //
categoryMove();


//##############################################//
//##############    FUNCTIONS    ##############//
//#############################################//


//#############    ARROW FUNCTION    ############//
// This is the function that builds the list of selectable "titles" that correspond to the categories. These are called from the JSON file. It is wrapped with a JSON calling function so you can access any data from the JSON file if you put your code above the xhttp.open/send lines
function categoryMove(command){
// Arrows have an onclick in HTML that calls this function with a parameter that tells the below conditionals what to do
    if(command == "add"&&categorySelected<12){
    categorySelected += 1; 
    }
    if(command == "subtract"&&categorySelected>0){
        categorySelected -= 1; 
    }
    var categoryCurrent = categories[categorySelected]; // < Very important to how this all works, but not a very good system I would say
    savedText = document.getElementById("copiedtext").innerHTML; // <saves text from before switching pages
// Printing information to web page
    document.getElementById('categoryLarge').innerHTML = categoryCurrent;
    document.getElementById('searchbox').placeholder = "Search " + categoryCurrent;
    var categoryDescriptor = "";
    switch(categoryCurrent){
        case "Telehealth":
          categoryDescriptor = "Is the client suitable for telehealth?";
          break;
        case "Presentation":
          categoryDescriptor = "What was the client's presentation in the session?";
          break;
        case "Symptoms":
          categoryDescriptor = "What symptoms has the client experienced since the last session?";
          break;
        case "Diagnoses":
          categoryDescriptor = "These symptoms are consistent within ____ disorder.";
          break;
        case "Disruption":
          categoryDescriptor = "How much do these symptoms disrupt the client's life?";
          break;
        case "Safety":
          categoryDescriptor = "How would you describe the client's safety status?";
          break;
        case "Topics":
          categoryDescriptor = "What general topics were discussed in the session?";
          break;
        case "Stage":
          categoryDescriptor = "What is the current stage of therapy?";
          break;
        case "Interventions":
          categoryDescriptor = "What are you doing (interventions) with the client to work towards client's goals?";
          break;
        case "Response":
          categoryDescriptor = "How did the client receive the session?";
          break;
        case "Strengths":
          categoryDescriptor = "What strengths did the client display in the session?";
          break;
        case "Progress":
          categoryDescriptor = "How is the client's progress in relation to the treatment plan?";
          break;
        case "Tasks":
          categoryDescriptor = "What steps will the therapist take in relationship to the treatment progress?";
          break;
    }
    numBoxesPerCategory();
  document.getElementById('descriptorParagraph').innerHTML = categoryDescriptor;
}


// ################   VALUE EXTRACTOR   ############ //
// Checkbox parent containers are created with IDs   (0,    1,    2,    3,    4,   etc)
// While Checkboxes themselves are created with IDs (1000, 1001, 1002, 1003, 1004, etc)
//            v  v  v   onclick they call this Function which pulls the text and puts it in the copy box.
function getCheckboxValue() {
    var i = 0;
    var result = "";
    while (i <= 5)
    {              
    // if the specific checkbox is checked >> add the value to the string result
        if (document.getElementById(i+1000).checked){ 
            result = result + " " + document.getElementById(i+1000).value };
            i+=1;
        }
    document.getElementById('copiedtext').innerHTML = result;
}   



// ####### COUNT NUM OF CHECK BOXES FOR EACH CATEGORY ###### //
        // **This is sloppy and can probably be revised** //
function numBoxesPerCategory(){
    
        //_____ JSON Calling Function _____//
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var testData = JSON.parse(xhttp.responseText);
        
        
        var categoryCurrent = document.getElementById("categoryLarge").innerHTML;
        var index = 0;
        var minCount = 0;
        var maxCount = 0;
        var categoryLength = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        
       // Add 1 for each time that category occurs // 
            for(var i = 0; i < testData.length; i++){
                if (testData[i].Category == "Telehealth"){
                    categoryLength[0] += 1;
                }
                else if (testData[i].Category == "Presentation"){
                    categoryLength[1] += 1;
                }
                else if (testData[i].Category == "Symptoms"){
                    categoryLength[2] += 1;
                }
                else if (testData[i].Category == "Diagnoses"){
                    categoryLength[3] += 1;
                }
                else if (testData[i].Category == "Disruption"){
                    categoryLength[4] += 1;
                }
                else if (testData[i].Category == "Safety"){
                    categoryLength[5] += 1;
                }    
            }
        
        // based upon how many objects are in each category,
        // set a minimum and maxium index.
        // ex.
        // if theres 2 checkboxes in telehealth
        // and 3 checkboxes in presentation
        // the minCount = 2 & maxCount = 4
        //
        // This way, the program only displays checkbox indexes 2, 3, & 4
        // when viewing the "Presentation" tab
            if (categoryCurrent == "Telehealth"){
                index = 0;
                minCount = 0;
                maxCount = categoryLength[0] - 1;
            }
            else if (categoryCurrent == "Presentation"){
                index = 1;
                minCount = categoryLength[0];
                maxCount = categoryLength[0] + categoryLength[1] - 1;
            }
            else if (categoryCurrent == "Symptoms"){
                index = 2;
                minCount = categoryLength[0] + categoryLength[1];
                maxCount = categoryLength[0] + categoryLength[1] + categoryLength[2] - 1;
            }
            else if (categoryCurrent == "Diagnoses"){
                index = 3;
                minCount = categoryLength[0] + categoryLength[1] + categoryLength[2];
                maxCount = categoryLength[0] + categoryLength[1] + categoryLength[2] + categoryLength[3] - 1;
            }
            else if (categoryCurrent == "Disruption"){
                index = 4;
            }
            else if (categoryCurrent == "Safety"){
                index = 5;
            }
        hideBoxes(minCount, maxCount, testData.length);
        }
    }
//____________End JSON Call____________________//
  xhttp.open("GET", "data.json", true);
  xhttp.send();
}



// ########## HIDE BOXES ############ //
// This functions hides all the checkboxes that are on different tabs
// and shows all checkboxes on the current tab
function hideBoxes(minCount, maxCount, testDataLength){
    for (var i = 0; i < testDataLength; i++){
        if (i <= maxCount && i >= minCount){
            document.getElementById(i).style.display = "block"
        }
        else {
            document.getElementById(i).style.display = "none"
        }
    }
}

function addTextBox(){


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var testData = JSON.parse(xhttp.responseText);

        
        
    //______Printing Checkboxes inside 'Divs'______//
      var output = '';
      for(var i = 0; i < testData.length; i++){
      }
        
          const checkBox = {
              Category: "test",
              Title: "test2",
          }
          window.localStorage.
          window.localStorage.setItem('checkBox', JSON.stringify(checkBox));
          var result = window.localStorage.getItem("checkBox");
        
        document.getElementById("resultt").innerHTML = result
      
        
        
    }};    

    //____________End JSON Call____________________//
    xhttp.open("GET", "data.json", true);
    xhttp.send();

}
// ##### COPY BUTTON FUNCTIONALITY ####### //
function copyTextFunction(){
  textHolder = document.getElementById('copiedtext');
  textHolder.select();
  document.execCommand("copy");
}


// #####   ERASE & MAKE NEW NOTE   ##### //
function newNoteAlert(){
  if(confirm("Are you sure you want to make a new note?")){
    location.reload();
  }
}





//ඞ