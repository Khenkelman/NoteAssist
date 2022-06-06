
///// DECLARE UNIVERSAL VARIABLES /////
var categories = ["Telehealth", "Presentation", "Symptoms", "Diagnoses", "Disruption", "Safety", "Topics", "Interventions", "Response", "Strengths", "Tasks"];
var categoryQuestions = ["Is the client suitable for telehealth?", "What was the client's presentation in the session?", "What symptoms has the client experienced since the last session?", "These symptoms are consistent within ____ disorders.", "How much do these symptoms disrupt the client's life?", "How would you describe the client's safety status?", "What general topics were discussed in the session?", "What are you doing (interventions) with the client to work towards client's goals?", "How did the client receive the session?", "What strengths did the client display in the session?", "What steps will the therapist take in relationship to the treatment progress?"  ]
var categoryStatement = ["Important information for the support of telehealth includes:", "The client's presentation to the session included:", "The client's symptomology since the last session included:", "These symptoms are consistent with:", "From the client's report and therapist observations, these symptoms disrupt the client's life to an extent of:", "The client's current safety status is:", "The general topics covered in the session included:", "The client and the therapist worked towards the client's goals with interventions such as:", "The client's observable reaction to these interventions included:", "The client displayed strengths and capabilities during the session of:", "Actions the therapist will take before the next session, or soon, include:"]

var ChkBoxes = {};


// GETS LOCALFILE OBJECTS // 
var localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));
var localFileString = window.localStorage.getItem('localChkBoxes');
var localFilePage = window.localStorage.getItem('currentPage');
var localFileChecked = window.localStorage.getItem('checkedBoxes');
var localStarChecked = window.localStorage.getItem('checkedStars');
var localTextBox = window.localStorage.getItem('textBox');



///// SET CURRENT PAGE == LOCALSTORAGE VALUE /////
///                             (OR 0)         ///
if (!localFilePage) { var categoryCurrent = 0; } else { var categoryCurrent = localFilePage; }

///// SET TEXT BOX == LOCALSTORAGE VALUE /////
///                                       ///
if (localTextBox) { document.getElementById('copiedDiv').innerHTML = localTextBox  }


///// SET TEXT BOX == LOCALSTORAGE VALUE /////
///                       (OR EMPTY)       ///
if (!localStarChecked) { var checkedStars = ""; } else { var checkedStars = localStarChecked; }



// IF LOCAL FILE EMPTY, ASSIGN VALUE 0 //
if(!localFileChecked) { var checkedBoxes = " " } else { var checkedBoxes = localFileChecked }






// FILLS IN EACH CHECK BOX //
FillInChkBoxes();
selectCheckBoxes();
selectStarBoxes();

///// CALL FUNCTIONS /////
updateTitles();
ShowTextCategories();



function CountNumObjects(val){
    var numObjects = 0;
    for (var prop in val) {
        if(val.hasOwnProperty(prop)){
            numObjects++
        }
    }
    return numObjects
}




//////   WRITES IN EVERY OBJECT IN    //////
/////   LOCALFILE INTO CHECKBOXES     //////
function FillInChkBoxes() {

    var checkedArray = []
    // GETS LOCALFILE CHECKED STARS // 
    if(localStarChecked) { checkedArray = localStarChecked.split(',').map(Number);}

    // COUNTS NUMBER OF OBJECTS // 
    var numObjects = CountNumObjects(localFileObject)
    
    // GETS ARRAY FROM CHECKEDBOXES //
    // PRINTS CHECKBOXES ON SCREEN //
    var result = "";

    for (var i = 1; i<= numObjects; i++){
        result += '<div id="d' + i +'"class="' + localFileObject[i].Category + '"><input type="checkbox" class="check" id="' + i + '" value="' + localFileObject[i].Output+'" onclick=BoxInteraction("' + i + '")><label for="' + localFileObject[i].Title + '">'
        result += localFileObject[i].Title + '</label><input type="checkbox" class="star" id="s' + i + '" onclick=StarClick()><button class="btn" id="' + i + '">X</button></div>'
    }
    
    // CREATES CHECKBOXES ON SCREEN //
    document.getElementById('boxes').innerHTML = result;
    
    // ADDS THE CHECKBOXES //
    for (x=(checkedArray.length-1); x>=0; x--){
        // GET BOXES ELEMENT //
        var boxesDiv = document.getElementById("boxes")

        // GET SELECTED ELEMENT *STARRED //
        var test2 = document.getElementById("d" + checkedArray[x]).outerHTML
        
        // REMOVE OLD ELEMENT //
        document.getElementById("d" + checkedArray[x]).outerHTML = "";

        // GET NEW BOXES ELEMENT
        result = document.getElementById("boxes").innerHTML

        // SET NEW BOXES ELEMENT //
        // HAS STARRED ITEMS LISTED FIRST //
        document.getElementById('boxes').innerHTML = test2 + result;
    }
    // HIDES CHECKBOXES ON DIFFERENT SCREEN //
    HideChkBoxes()
} 




//////   HIDES CHECKBOXES IN DIFFERENT CATEGORY    //////
function HideChkBoxes() {

    // COUNTS NUMBER OF OBJECTS // 
    numObjects = CountNumObjects(localFileObject)

    // FINDS EACH CHECKBOX LABEL //
    var chkBoxDiv = document.getElementById('boxes');
    var chkBoxLabel = chkBoxDiv.getElementsByTagName('div');

    //      LOOPS THROUGH EACH LABEL         //
    // IF CHECKBOX TITLE == CURRENT CATEGORY //
    //    SHOW CHECKBOX, OTHERWISE HIDE IT   // 
    var currentCategoryString = categories[categoryCurrent];
    for(var i = 0; i < (numObjects); i++) {
        if (chkBoxLabel[i].className == currentCategoryString) 
        { 
            chkBoxLabel[i].style.display = "block" 
        }
        else { chkBoxLabel[i].style.display = "none" }                    
    }
}
        




//////      PULLS VALUE FROM LOCALSTORAGE       /////
//// CHECKS EACH Star THAT WAS PREVIOUSLY CHECKED ////
function selectStarBoxes() {

    // FINDS EACH CHECKBOX //
    var boxesDiv = document.getElementById('boxes');
    var starBoxes = boxesDiv.getElementsByClassName('star');


    // GETS ARRAY FROM CHECKEDBOXES //
    var checkedArray = checkedStars.split(',');
    // FOR EACH CHECKBOX THAT MATCHES, SELECT IT //
    for (var z = 0; z < starBoxes.length; z++){
        for(var y = 0; y <= checkedArray.length; y++)
        {
            if (((starBoxes[z].id).replace("s","")) == checkedArray.at(y))
            {
                document.getElementById(starBoxes[z].id).checked = true
            } 
        }
    }  
}





//////      PULLS VALUE FROM LOCALSTORAGE       /////
//// CHECKS EACH BOX THAT WAS PREVIOUSLY CHECKED ////
function selectCheckBoxes(){

    // FINDS EACH CHECKBOX //
    var boxesDiv = document.getElementById('boxes');
    var checkboxes = boxesDiv.getElementsByTagName('input');

    // GETS ARRAY FROM CHECKEDBOXES //
    var checkedArray = checkedBoxes.split(',').map(Number);

    // FOR EACH CHECKBOX THAT MATCHES, SELECT IT //
    for(var z = 0; z < checkboxes.length; z++){
        for(var y = 0; y < checkedArray.length; y++)
        {
            if (checkboxes[z].id == checkedArray[y])
            {
                checkboxes[z].checked = true;
            }
        }
    }    
}





////// UPDATES HTML TITLES = CURRENT CATEGORY //////
function updateTitles(){
    var categoryCurrentString = categories[categoryCurrent]
    document.getElementById("categoryLarge").innerHTML= categories[categoryCurrent]
    document.getElementById("searchtitle").innerHTML= ("Search " + categoryCurrentString);
    document.getElementById("descriptorParagraph").innerHTML=categoryQuestions[categoryCurrent]
}
        


        
        
/*############## /////  BUTTONS  ////// ###############*/

//////   ADD NEW OBJECT   //////
document.getElementById("addChkBox").onclick = function() { document.getElementById("newChkBox").style.display = "block"; }




//////   EXIT NEW OBJECT   //////
document.getElementById("exit").onclick = function() { document.getElementById("newChkBox").style.display = "none"; }




//////   MENU   //////
document.getElementById("menuIcon").onclick = function() { document.getElementById("menu").style.display = "block"; }




//////   EXIT MENU   //////
document.getElementById("menuExit").onclick = function() { document.getElementById("menu").style.display = "none"; }




////// DECREASES CURRENT CATEGORY //////
///////         (ARROW)          ///////
document.getElementById("arrow1").onclick = function() {
    if (categoryCurrent > 0 && categoryCurrent <= categories.length) {
        categoryCurrent = categoryCurrent - 1
        
        // ERASES SEARCHBOX VALUE //
        document.getElementById("searchbox").value = "";

        // HIDES CHECKBOXES ON DIFFERENT SCREEN //
        HideChkBoxes();
        
        // UPDATE TITLES //
        updateTitles();
    }
}




////// INCREASE CURRENT CATEGORY //////
///////         (ARROW)         ///////
document.getElementById("arrow2").onclick = function() {
    if (categoryCurrent >= 0 && categoryCurrent < (categories.length-1)) {
        categoryCurrent++
        
        // ERASES SEARCHBOX VALUE //
        document.getElementById("searchbox").value = "";
        
        // HIDES CHECKBOXES ON DIFFERENT SCREEN //
        HideChkBoxes();
        
        // UPDATE TITLES //
        updateTitles();
    }
}





//////  COPY BUTTON  //////
document.getElementById("copybox").onclick = function() {
    // FINDS EACH TEXT DIV IN TEXTBOX //
    var copiedDiv = document.getElementById('copiedDiv')
    var categoryBoxes = copiedDiv.getElementsByTagName('div')
    
    // IF DIV HAS A VALUE //
    //  ASSIGN TO STRING  //
    var categoryBoxesString = ""
    for (x=0;x<categoryBoxes.length;x++){
        if ((categoryBoxes[x].outerHTML).includes("display: block")){
            var addedString = categoryBoxes[x].innerHTML
            categoryBoxesString = categoryBoxesString + addedString
        }
    }
    // COPY STRING TO CLIPBOARD //
    //    ADDS BOLDED STRING    //
    copyToClipboard(categoryBoxesString)
}





///////  NEW NOTE BUTTON   ///////
document.getElementById("newnote").onclick = function() {
    if(confirm("Are you sure you want to make a new note?")){
        // CLEARS LOCALSTORAGE FILES
        window.localStorage.removeItem("localFilePage");
        window.localStorage.removeItem("checkedBoxes");
        window.localStorage.removeItem("textBox");

        // RELOADS PAGE //
        location.reload();
    }
}





//////   CREATE BUTTON   //////
/////   RETRIEVES INPUT   /////
document.getElementById("create").onclick = function() {

    // COUNTS NUMBER OF OBJECTS // 
    numObjects = CountNumObjects(localFileObject)
    
    // GETS VALUES FROM INPUT FIELD //
    var descriptionInput = document.getElementById("descriptor").value;
    var textInput = document.getElementById("text").value;

    // ADDS NEW OBJECT TO LIST //
    localFileObject[numObjects+1] = new Object();
    localFileObject[numObjects+1].Category = categories[categoryCurrent];
    localFileObject[numObjects+1].Title = textInput;
    localFileObject[numObjects+1].Output = descriptionInput;

    // UPDATES LOCAL STORAGE //
    window.localStorage.setItem('localChkBoxes', JSON.stringify(localFileObject));

    // HIDES NEW OBJECT MENU //
    document.getElementById("newChkBox").style.display = "none";

    // GETS STRING FROM TEXTBOX //
    SetTextboxLocalStorageValue()

    // CREATES ARRAY FOR CHECKED BOXES //
    var checkedBoxes = []

    // FINDS EACH CHECKBOX //
    var boxesDiv = document.getElementById('boxes');
    var checkboxes = boxesDiv.getElementsByTagName('input');

    // FOR EACH CHECKBOX //
    for(var z = 0; z < checkboxes.length; z++){

        //      IF IT IS CHECKED        //
        // ASSIGN TO CHECKEDBOXES ARRAY //
        if (checkboxes[z].checked)
        { checkedBoxes.push(checkboxes[z].id) }
    }

    window.localStorage.setItem('checkedBoxes', checkedBoxes) ////
    window.localStorage.setItem('currentPage', categoryCurrent)
    window.localStorage.setItem('localChkBoxes', JSON.stringify(localFileObject));
    // FILLS IN CHECK BOXES WITH NEW VALUE //
    location.reload();
}
        




///////// DELETE CHECKBOX ////////

// FIND EACH BUTTON //
var buttons = document.getElementsByClassName("btn");

//////      FOR EACH BUTTON    //////
////// CREATE ONCLICK FUNCTION //////
for (var i=0; i < buttons.length; i++){
    buttons[i].onclick = function(i){

        var confirmAction = confirm("Are you sure you want to delete this option forever?");
        if (confirmAction) {
            // CREATES CUSTOM OBJECT //
            const customFileObject = {};

            // CREATE LIST OF CHECKED BOXES //
            var checkedBoxes = []

            // GETS LOCALFILE OBJECT // 
            //var localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));

            // COUNT LENGTH OF OBJECT //
            var count = 0;
            for (properties in localFileObject) {
                count = count + 1
            }

            // FILLS IN NEW CUSTOM OBJECT //
            for(var x = 1; x <= count; x++){
                if (x < i.target.id){customFileObject[x] = localFileObject[x]}
                if (x > i.target.id){customFileObject[x-1] = localFileObject[x]}
            }

            // FINDS WHICH CHECKBOX IS SELECTED //
            //      ASSIGNS VALUES TO ARRAY     //

            // FINDS EACH CHECKBOX //
            var boxesDiv = document.getElementById('boxes');
            var checkboxes = boxesDiv.getElementsByClassName('check');

            // FOR EACH CHECKBOX //
            for(var z = 0; z < checkboxes.length; z++){

                // IF IT IS CHECKED //
                if (checkboxes[z].checked)
                {
                    // IF IT LESS THAN ITEM ERASED  //
                    // ASSIGN VALUE TO CHECKEDBOXES //
                    if (parseInt(checkboxes[z].id) < parseInt(i.target.id))
                    {checkedBoxes.push(checkboxes[z].id)}


                    // IF IT MORE THAN ITEM ERASED     //
                    // ASSIGN VALUE - 1 TO CHECKEDBOXES//
                    else if (parseInt(checkboxes[z].id) > parseInt(i.target.id))
                    { 
                        checkedBoxes.push((parseInt(checkboxes[z].id) - 1))}
                }
            }

            // COPY FROM TEXT BOX //
            SetTextboxLocalStorageValue()

            // TESTING
            var checkedStarBoxes = []
            // FINDS EACH CHECKBOX //
            var starBoxes = boxesDiv.getElementsByClassName('star')
            // FOR EACH STARBOX //
            for(x=0; x<starBoxes.length; x++){ 
                if (starBoxes[x].checked && parseInt(starBoxes[x].id.replace("s", "")) < i.target.id){
                    checkedStarBoxes.push(starBoxes[x].id.replace("s", ""))
                } else if (starBoxes[x].checked && parseInt(starBoxes[x].id.replace("s", "")) > i.target.id){
                    checkedStarBoxes.push(parseInt(starBoxes[x].id.replace("s", "") - 1))
                }
            }
            // SETS LOCALSTORAGE BEFORE RELOAD //
            window.localStorage.setItem('checkedBoxes', checkedBoxes)
            window.localStorage.setItem('checkedStars', checkedStarBoxes)
            window.localStorage.setItem('currentPage', categoryCurrent)
            window.localStorage.setItem('localChkBoxes', JSON.stringify(customFileObject));

            // RELOADS PAGE //
            location.reload();
        }
    }
}









// XMLHTTPREQUEST ACCESS'S .JSON FILE //
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState === 3 && this.status === 200) {
        
        ///// RESETS PROGRAM, PULLS FROM .JSON FILE /////
        function resetLocalStorage (){
            window.localStorage.clear();
            categoryCurrent = 0;
            updateTitles();
            
            //    READS .JSON    //
            //   CLEAN UP TEXT   //
            var rawJSON = JSON.stringify(JSON.parse(xhttp.responseText));
            rawJSON = rawJSON.replaceAll('[','');
            rawJSON = rawJSON.replaceAll(']','');
            var cleanJSON = rawJSON.match(/\w+|"[^"]+"/g);
            var i = cleanJSON.length;
            while(i--){ cleanJSON[i] = cleanJSON[i].replace(/"/g,""); }

            // CREATE OBJECT FOR EACH JSON SEGMENT /
            ChkBoxes = {};
            var u = 1;
            for(var i = 1; u < cleanJSON.length; i++){
                ChkBoxes[i] = new Object();
                ChkBoxes[i].Category = cleanJSON[u];
                ChkBoxes[i].Title = cleanJSON[u + 2];
                ChkBoxes[i].Output = cleanJSON[u + 4];
                u += 6;
            }

            //  SETS LOCAL STORAGE == NEW OBJECT //
            window.localStorage.setItem('localChkBoxes', JSON.stringify(ChkBoxes));
            // RELOAD PAGE //
            location.reload();
        }
        
        //////  RESET LOCALSTORAGE BUTTON  //////
        document.getElementById("resetLocalStorage").onclick = function() {
            if(confirm("Are you sure you want to reset everything?!")){
                resetLocalStorage(); 
            } 
        }
    }
};    
////// End XMLHTTP JSON Call //////
xhttp.open("GET", "data.json", true);
xhttp.send();





////// Check Box Select //////
//////  Copy Text Over  //////
function BoxInteraction(x){
    
    // If checkbox = checked, set result = output //
    if (document.getElementById(x).checked){ 
        for(y=0; y<categories.length; y++){
            if (localFileObject[x].Category == categories[y]){
                var selectedCategoryBox = document.getElementById(categories[y] + "Box")
                selectedCategoryBox.innerHTML = selectedCategoryBox.innerHTML + " " + localFileObject[x].Output
            }
        }
    }
    else{
        for(y=0; y<categories.length; y++){
            if (localFileObject[x].Category == categories[y]){
                var selectedCategoryBox = document.getElementById(categories[y] + "Box")
                selectedCategoryBox.innerHTML = selectedCategoryBox.innerHTML.replace((" " + localFileObject[x].Output),'')
            }
        }
    }
    ShowTextCategories();
}


////// UPDATES SEARCH CHECKBOXES /////
function SearchUpdate(){
    
    var checkboxes = [];
    
    var categoryCurrent = document.getElementById("categoryLarge").innerHTML
    
    // FINDS EACH CHECKBOX //
    var boxesDiv = document.getElementById('boxes');
    var categoryDiv = boxesDiv.getElementsByClassName(categoryCurrent)
    
    for(y = 0; y < categoryDiv.length; y++){
        var test = categoryDiv[y].getElementsByTagName('label')
        checkboxes.push((test[0].innerHTML).toLowerCase())
    }
    
    // FOR EACH CHECKBOX //
    for(x = 0; x < checkboxes.length; x++){
        if(checkboxes[x].includes((document.getElementById("searchbox").value).toLowerCase()))
        {
            categoryDiv[x].style.display = "block"; 
        } else {
            
            categoryDiv[x].style.display = "none"; 
        } 
    }
}



function ShowTextCategories(){
    for(x=0;x<categories.length;x++){
        
        var test = ((document.getElementById(categories[x]+"Box").innerHTML).replace("<b>" + categoryStatement[x] + "</b>", ""))
        test = test.replaceAll("<br>", "")
        if (test.length === 0){
            document.getElementById(categories[x]+"Box").style.display = "none"
        }else{
            document.getElementById(categories[x]+"Box").style.display = "block"
        }
    }
}



function StarClick(){
    SetStarLocalStorageValue()
    SetCheckboxLocalStorageValue()
    SetTextboxLocalStorageValue()
    SetPageLocalStorageValue()
    location.reload();
}

    
function SetStarLocalStorageValue(){
    // FINDS EACH CHECKED STARBOX
    var checkedStarBoxes = []
    var boxesDiv = document.getElementById('boxes');
    var starBoxes = boxesDiv.getElementsByClassName('star')
    // FOR EACH STARBOX //
    for(x=0; x<starBoxes.length; x++){ 
        if (starBoxes[x].checked){
            checkedStarBoxes.push(starBoxes[x].id.replace("s", ""))
        }
    }
    window.localStorage.setItem('checkedStars', checkedStarBoxes)
}


function SetCheckboxLocalStorageValue(){
    var checkedBoxes = []
    var boxesDiv = document.getElementById('boxes');
    var checkBoxes = boxesDiv.getElementsByClassName('check')
    // FOR EACH STARBOX //
    for(x=0; x<checkBoxes.length; x++){ 
        if (checkBoxes[x].checked){
            checkedBoxes.push(checkBoxes[x].id)
        }
    }
    window.localStorage.setItem('checkedBoxes', checkedBoxes)
}



function SetTextboxLocalStorageValue(){
    // GETS STRING FROM TEXTBOX //
    textHolder = document.getElementById("copiedDiv").innerHTML
    window.localStorage.setItem('textBox', textHolder)
}

function SetPageLocalStorageValue(){
    var localFilePage = window.localStorage.getItem('currentPage');
        window.localStorage.setItem('currentPage', categoryCurrent)
    
}
function copyToClipboard(text) {
  // Create container for the HTML
    var dummy = document.createElement("div");
    dummy.innerHTML = text
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
      dummy.style.position = 'fixed'
      dummy.style.pointerEvents = 'none'
      dummy.style.opacity = 0
    
     // Detect all style sheets of the page
    var activeSheets = Array.prototype.slice.call(document.styleSheets)
    .filter(function (sheet) {
        return !sheet.disabled
    })
    // Mount the container to the DOM to make `contentWindow` available
    document.body.appendChild(dummy);
        
    
    // Copy to clipboard
    window.getSelection().removeAllRanges()
    var range = document.createRange()
    range.selectNode(dummy)
    window.getSelection().addRange(range)
        
    document.execCommand('copy')
        
    for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = true
        
    document.execCommand('copy')
        
    for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false
        
    document.body.removeChild(dummy)   
}