///////////////////////////////////////
///// DECLARE UNIVERSAL VARIABLES /////
///////////////////////////////////////

var categories = ["Telehealth", "Presentation", "Symptoms", "Diagnoses", "Disruption", "Safety", "Topics", "Interventions", "Response", "Strengths", "Tasks"];
var categoryQuestions = ["Is the client suitable for telehealth?", "What was the client's presentation in the session?", "What symptoms has the client experienced since the last session?", "These symptoms are consistent within ____ disorders.", "How much do these symptoms disrupt the client's life?", "How would you describe the client's safety status?", "What general topics were discussed in the session?", "What are you doing (interventions) with the client to work towards client's goals?", "How did the client receive the session?", "What strengths did the client display in the session?", "What steps will the therapist take in relationship to the treatment progress?"  ];
var categoryStatement = ["Important information for the support of telehealth includes:", "The client's presentation to the session included:", "The client's symptomology since the last session included:", "These symptoms are consistent with:", "From the client's report and therapist observations, these symptoms disrupt the client's life to an extent of:", "The client's current safety status is:", "The general topics covered in the session included:", "The client and the therapist worked towards the client's goals with interventions such as:", "The client's observable reaction to these interventions included:", "The client displayed strengths and capabilities during the session of:", "Actions the therapist will take before the next session, or soon, include:"];

//  CALLS FUNCTIONS   //
// JSLint RECOMMENDED //
var call = "";

// GETS LOCALFILE OBJECTS // 
var localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));
var localFilePage = window.localStorage.getItem('currentPage');
var localStarChecked = window.localStorage.getItem('checkedStars');
var localTextBox = window.localStorage.getItem('textBox');

///// SET CURRENT PAGE == LOCALSTORAGE VALUE /////
///                             (OR 0)         ///
if (!localFilePage) { var categoryCurrent = 0; } else { categoryCurrent = localFilePage; }

///// SET TEXT BOX == LOCALSTORAGE VALUE /////
///                       (OR EMPTY)       ///
if (localTextBox) { document.getElementById('copiedDiv').innerHTML = localTextBox;  }

///// SET CHECKED STARS == LOCALSTORAGE VALUE /////
///                            (OR 0)           ///
if (localStarChecked) { var localStarChecked = 0; } else { localStarChecked = window.localStorage.getItem('checkedStars'); }

///////////////////////////////////////
/////           FUNCTIONS         /////
///////////////////////////////////////

///// COUNTS NUM OF OBJECTS IN A GIVEN VALUE /////
function CountNumObjects(val) {
    "use strict";
    var numObjects = 0, prop = 0;
    for (prop in val) {
        if (val.hasOwnProperty(prop)) {
            numObjects += 1;
        }
    }
    return numObjects;
}

function SetStarLocalStorageValue() {
    "use strict";
    // FINDS EACH CHECKED STARBOX //
    var checkedStarBoxes = [], boxesDiv = document.getElementById('boxes'), starBoxes = boxesDiv.getElementsByClassName('star'), x = 0;
    // FOR EACH STARBOX //
    for (x = 0; x < starBoxes.length; x += 1) {
        // SET ARRAY = CHECKED STARBOX //
        if (starBoxes[x].checked) {
            checkedStarBoxes.push(starBoxes[x].id.replace("s", ""));
        }
    }
    // ASSIGN VALUE TO LOCAL STORAGE //
    window.localStorage.setItem('checkedStars', checkedStarBoxes);
}

function SetCheckboxLocalStorageValue() {
    "use strict";
    // FINDS EACH CHECKEDBOX //
    var checkedBoxes = [], boxesDiv = document.getElementById('boxes'), checkBoxes = boxesDiv.getElementsByClassName('check'), x = 0;
    // FOR EACH CHECKBOX //
    for (x = 0; x < checkBoxes.length; x += 1) {
        // SET ARRAY = CHECKEDBOX //
        if (checkBoxes[x].checked) {
            checkedBoxes.push(checkBoxes[x].id);
        }
    }
    // ASSIGN VALUE TO LOCAL STORAGE //
    window.localStorage.setItem('checkedBoxes', checkedBoxes);
}

function SetTextboxLocalStorageValue() {
    "use strict";
    // GETS STRING FROM TEXTBOX //
    var textHolder = document.getElementById("copiedDiv").innerHTML;
    // ASSIGN VALUE TO LOCAL STORAGE //
    window.localStorage.setItem('textBox', textHolder);
}

function SetPageLocalStorageValue() {
    "use strict";
    window.localStorage.setItem('currentPage', categoryCurrent);
}

//////   HIDES CHECKBOXES IN DIFFERENT CATEGORY    //////
function HideChkBoxes() {
    "use strict";
    // COUNTS NUMBER OF OBJECTS //                  // FINDS EACH CHECKBOX LABEL //
    var numObjects = CountNumObjects(localFileObject), chkBoxDiv = document.getElementById('boxes'), chkBoxLabel = chkBoxDiv.getElementsByTagName('div'), currentCategoryString = categories[categoryCurrent], i = 0;
    //      LOOPS THROUGH EACH LABEL         //
    // IF CHECKBOX TITLE == CURRENT CATEGORY //
    //    SHOW CHECKBOX, OTHERWISE HIDE IT   // 
    for (i = 0; i < (numObjects); i += 1) {
        if (chkBoxLabel[i].className === currentCategoryString) {
            chkBoxLabel[i].style.display = "block";
        } else { chkBoxLabel[i].style.display = "none"; }
    }
}

//////      PULLS VALUE FROM LOCALSTORAGE       /////
//// CHECKS EACH STAR THAT WAS PREVIOUSLY CHECKED ////
function SelectStarBoxes() {
    "use strict";
    // FINDS EACH CHECKBOX //
    var boxesDiv = document.getElementById('boxes'), starBoxes = boxesDiv.getElementsByClassName('star'), checkedArray = "", z = 0, y = 0;
    // GETS ARRAY FROM CHECKEDBOXES //
    if (localStarChecked) { checkedArray = localStarChecked.split(','); } else {checkedArray = ""; }
    // FOR EACH CHECKBOX THAT MATCHES, SELECT IT //
    for (z = 0; z < starBoxes.length; z += 1) {
        for (y = 0; y <= checkedArray.length; y += 1) {
            if (((starBoxes[z].id).replace("s", "")) === checkedArray.at(y)) {
                document.getElementById(starBoxes[z].id).checked = true;
            }
        }
    }
}

//////      PULLS VALUE FROM LOCALSTORAGE       /////
//// CHECKS EACH BOX THAT WAS PREVIOUSLY CHECKED ////
function SelectCheckBoxes() {
    "use strict";
    // FINDS EACH CHECKBOX //
    var checkedBoxes = window.localStorage.getItem('checkedBoxes'), boxesDiv = document.getElementById('boxes'), checkboxes = boxesDiv.getElementsByClassName('check'), checkedArray = "", z = 0, y = 0;
    if (checkedBoxes) {
        // GETS ARRAY FROM CHECKEDBOXES //
        checkedArray = checkedBoxes.split(',').map(Number);

        // FOR EACH CHECKBOX THAT MATCHES, SELECT IT //
        for (z = 0; z < checkboxes.length; z += 1) {
            for (y = 0; y < checkedArray.length; y += 1) {
                if (parseInt(checkboxes[z].id, 10) === checkedArray[y]) {
                    checkboxes[z].checked = true;
                }
            }
        }
    }
}

////// UPDATES HTML TITLES = CURRENT CATEGORY //////
function updateTitles() {
    "use strict";
    var categoryCurrentString = categories[categoryCurrent];
    document.getElementById("categoryLarge").innerHTML = categories[categoryCurrent];
    document.getElementById("searchtitle").innerHTML = ("Search " + categoryCurrentString);
    document.getElementById("descriptorParagraph").innerHTML = categoryQuestions[categoryCurrent];
}

//////   WRITES IN EVERY OBJECT IN    //////
/////   LOCALFILE INTO CHECKBOXES     //////
function FillInChkBoxes() {
    "use strict";
    localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));
    localFilePage = window.localStorage.getItem('currentPage');
    localStarChecked = window.localStorage.getItem('checkedStars');
    localTextBox = window.localStorage.getItem('textBox');
    
    // DECLARE VARIABLES //
    var checkedArray = [], i = 1, x = 0, result = "", starHtml = "", r = "";
        
    // GETS LOCALFILE CHECKED STARS // 
    if (localStarChecked) { checkedArray = localStarChecked.split(',').map(Number); }

    // CREATES CHECKBOXES ELEMENT //
    for (i = 1; i <= CountNumObjects(localFileObject); i += 1) {
        r += '<div id="d' + i + '"class="' + localFileObject[i].Category + '">';
        r += '<span class="tooltiptext">' + localFileObject[i].Output + '</span>';
        r += '<input type="checkbox" class="check" id="' + i + '" value="' + localFileObject[i].Output + '" onclick=BoxInteraction("' + i + '")>';
        r += '<label for="' + localFileObject[i].Title + '">';
        r += localFileObject[i].Title;
        r += '</label>';
        r += '<input type="checkbox" class="star" id="s' + i + '" onclick=StarClick()>';
        r += '<button onclick=DeleteCheckbox("' + i + '") class=btn id="' + i + '">';
        r += 'X';
        r += '</button>';
        r += '</div>';
    }
    
    // PLACES ELEMENTS ON SCREEN //
    document.getElementById('boxes').innerHTML = r;
    
    // ORGANIZES THE STAR BOXES FIRST //
    for (x = (checkedArray.length - 1); x >= 0; x -= 1) {

        // COPIES ELEMENT FROM CHECKED STAR //
        starHtml = document.getElementById("d" + checkedArray[x]).outerHTML;
        
        // REMOVES OLD CHECKED STAR //
        document.getElementById("d" + checkedArray[x]).outerHTML = "";

        // GET NEW BOXES ELEMENT
        result = document.getElementById("boxes").innerHTML;

        // SET NEW BOXES ELEMENT //
        // HAS STARRED ITEMS LISTED FIRST //
        document.getElementById('boxes').innerHTML = starHtml + result;
    }
    
    // SELECT ALL PREVIOUS SELECTED CHECKBOXES //
    call = new SelectCheckBoxes();
    // SELECT ALL PREVIOUS SELECTED STARBOXES //
    call = new SelectStarBoxes();
    // HIDES ALL BOXES NOT ON CURRENT PAGE //
    call = new HideChkBoxes();
    ///// UPDATES TITLE = CURRENT PAGE /////
    updateTitles();
}

        
//////        IN TEXT BOX             //////
////// IF CATEGORYBOX CONTAINS STRING //////
//////  SHOW BOX, OTHERWISE HIDE IT   //////
function ShowTextCategories() {
    "use strict";
    var containingString = "", x = 0;
    for (x = 0; x < categories.length; x += 1) {
        
        containingString = ((document.getElementById(categories[x] + "Box").innerHTML).replace("<b>" + categoryStatement[x] + "</b>", ""));
        containingString = containingString.replaceAll("<br>", "");
        if (containingString.length === 0) {
            document.getElementById(categories[x] + "Box").style.display = "none";
        } else {
            document.getElementById(categories[x] + "Box").style.display = "block";
        }
    }
}

function copyToClipboard(text) {
    "use strict";
  // Create container for the HTML
    var dummy = document.createElement("div"), activeSheets = "", range = "", i = 0;
    dummy.innerHTML = text;
    dummy.style.position = 'fixed';
    dummy.style.pointerEvents = 'none';
    dummy.style.opacity = 0;

     // Detect all style sheets of the page
    activeSheets = Array.prototype.slice.call(document.styleSheets)
        .filter(function (sheet) {
            return !sheet.disabled;
        });
    // Mount the container to the DOM to make `contentWindow` available
    document.body.appendChild(dummy);

    // Copy to clipboard
    window.getSelection().removeAllRanges();
    range = document.createRange();
    range.selectNode(dummy);
    window.getSelection().addRange(range);
    
    document.execCommand('copy');
    
    for (i = 0; i < activeSheets.length; i += 1) { activeSheets[i].disabled = true; }
        
    document.execCommand('copy');
        
    for (i = 0; i < activeSheets.length; i += 1) { activeSheets[i].disabled = false; }
        
    document.body.removeChild(dummy);
}

////// UPDATES SEARCH CHECKBOXES /////
function SearchUpdate() {
    "use strict";
    var checkboxes = [], categoryCurrent = document.getElementById("categoryLarge").innerHTML, boxesDiv = document.getElementById('boxes'), categoryDiv = boxesDiv.getElementsByClassName(categoryCurrent), test = "", x = 0, y = 0;
    
    for (y = 0; y < categoryDiv.length; y += 1) {
        test = categoryDiv[y].getElementsByTagName('label');
        checkboxes.push((test[0].innerHTML).toLowerCase());
    }
    
    // FOR EACH CHECKBOX //
    for (x = 0; x < checkboxes.length; x += 1) {
        if (checkboxes[x].includes((document.getElementById("searchbox").value).toLowerCase())) {
            categoryDiv[x].style.display = "block";
        } else {
            categoryDiv[x].style.display = "none";
        }
    }
}

function DeleteCheckbox(i) {
    "use strict";
    // DECLARE VARIABLES //
    var confirmAction = window.confirm("Are you sure you want to delete this option forever?"), boxesDiv = document.getElementById('boxes'), checkboxes = boxesDiv.getElementsByClassName('check'), starBoxes = boxesDiv.getElementsByClassName('star'), customFileObject = {}, checkedBoxes = [], checkedStarBoxes = [], x = 0, y = 1, z = 0, numObjects = new CountNumObjects(localFileObject);
    if (confirmAction) {
        
        // FILLS IN NEW CUSTOM OBJECT //
        for (y = 1; y <= CountNumObjects(localFileObject); y += 1) {
            if (y < i) {customFileObject[y] = localFileObject[y]; }
            if (y > i) {customFileObject[y - 1] = localFileObject[y]; }
        }

        // FOR EACH CHECKBOX //
        for (z = 0; z < checkboxes.length; z += 1) {

            // IF IT IS CHECKED //
            if (checkboxes[z].checked) {
                //   IF IT LESS THAN ITEM ERASED   //
                //   ASSIGN VALUE TO CHECKEDBOXES  //
                //           ELSE                  //
                // ASSIGN VALUE - 1 TO CHECKEDBOXES//
                if (parseInt(checkboxes[z].id, 10) < parseInt(i, 10)) {
                    checkedBoxes.push(checkboxes[z].id);
                } else if (parseInt(checkboxes[z].id, 10) > parseInt(i, 10)) {
                    checkedBoxes.push((parseInt(checkboxes[z].id, 10) - 1));
                }
            }
        }
        // COPY FROM TEXT BOX //
        call = new SetTextboxLocalStorageValue();

        // FOR EACH STARBOX //
        for (x = 0; x < starBoxes.length; x += 1) {
            if (starBoxes[x].checked && parseInt(starBoxes[x].id.replace("s", ""), 10) < i) {
                checkedStarBoxes.push(starBoxes[x].id.replace("s", ""));
            } else if (starBoxes[x].checked && parseInt(starBoxes[x].id.replace("s", ""), 10) > i) {
                checkedStarBoxes.push(parseInt(starBoxes[x].id.replace("s", "") - 1, 10));
            }
        }
        // SETS LOCALSTORAGE BEFORE RELOAD //
        window.localStorage.setItem('checkedBoxes', checkedBoxes);
        window.localStorage.setItem('checkedStars', checkedStarBoxes);
        window.localStorage.setItem('currentPage', categoryCurrent);
        window.localStorage.setItem('localChkBoxes', JSON.stringify(customFileObject));
        
        // FILLS IN CHECK BOXES //
        call = new FillInChkBoxes();
        // UPDATES SEARCHBOX //
        call = new SearchUpdate();
    }
}

////// Check Box Select //////
//////  Copy Text Over  //////
function BoxInteraction(x) {
    "use strict";
    var y = 0, selectedCategoryBox = "";
    // If checkbox = checked, set result = output //
    if (document.getElementById(x).checked) {
        for (y = 0; y < categories.length; y += 1) {
            if (localFileObject[x].Category === categories[y]) {
                selectedCategoryBox = document.getElementById(categories[y] + "Box");
                selectedCategoryBox.innerHTML = selectedCategoryBox.innerHTML + " " + localFileObject[x].Output;
            }
        }
    } else {
        for (y = 0; y < categories.length; y += 1) {
            if (localFileObject[x].Category === categories[y]) {
                selectedCategoryBox = document.getElementById(categories[y] + "Box");
                selectedCategoryBox.innerHTML = selectedCategoryBox.innerHTML.replace((" " + localFileObject[x].Output), '');
            }
        }
    }
    call = new ShowTextCategories();
    call = new SetCheckboxLocalStorageValue();
}

function StarClick() {
    "use strict";
    // SET LOCALSTORAGE VALUE //
    call = new SetStarLocalStorageValue();
    // FILLS IN CHECKBOXES //
    call = new FillInChkBoxes();
    // UPDATES SEARCHBOX //
    call = new SearchUpdate();
}
///////////////////////////////////////
/////           BUTTONS           /////
///////////////////////////////////////

//////   ADD NEW OBJECT   //////
document.getElementById("addChkBox").onclick = function () { "use strict"; document.getElementById("newChkBox").style.display = "block"; };

//////   EXIT NEW OBJECT   //////
document.getElementById("exit").onclick = function () { "use strict"; document.getElementById("newChkBox").style.display = "none"; };

//////   MENU   //////
document.getElementById("menuIcon").onclick = function () { "use strict"; document.getElementById("menu").style.display = "block"; };

//////   EXIT MENU   //////
document.getElementById("menuExit").onclick = function () { "use strict"; document.getElementById("menu").style.display = "none"; };

////// DECREASES CURRENT CATEGORY //////
///////         (ARROW)          ///////
document.getElementById("arrow1").onclick = function () {
    "use strict";
    if (categoryCurrent > 0 && categoryCurrent <= categories.length) {
        categoryCurrent = categoryCurrent - 1;
        
        // ERASES SEARCHBOX VALUE //
        document.getElementById("searchbox").value = "";

        // HIDES CHECKBOXES ON DIFFERENT SCREEN //
        call = new HideChkBoxes();
        
        // UPDATE TITLES //
        updateTitles();
    }
};

////// INCREASE CURRENT CATEGORY //////
///////         (ARROW)         ///////
document.getElementById("arrow2").onclick = function () {
    "use strict";
    if (categoryCurrent >= 0 && categoryCurrent < (categories.length - 1)) {
        categoryCurrent += 1;
        
        // ERASES SEARCHBOX VALUE //
        document.getElementById("searchbox").value = "";
        
        // HIDES CHECKBOXES ON DIFFERENT SCREEN //
        call = new HideChkBoxes();
        
        // UPDATE TITLES //
        updateTitles();
    }
};

//////  COPY BUTTON  //////
document.getElementById("copybox").onclick = function () {
    "use strict";
    // DECLARES FUNCTION FOR A TIMER //
    function ChangeCopyLabel() { document.getElementById("copybox").innerHTML = "&#10063; Copy"; }
    
    // DECLARES VARIABLES //
    var copiedDiv = document.getElementById('copiedDiv'), categoryBoxes = copiedDiv.getElementsByTagName('div'), categoryBoxesString = "", x = 0, addedString = "";
    
    // IF DIV HAS A VALUE //
    //  ASSIGN TO STRING  //
    for (x = 0; x < categoryBoxes.length; x += 1) {
        if ((categoryBoxes[x].outerHTML).includes("display: block")) {
            addedString = categoryBoxes[x].innerHTML;
            categoryBoxesString = categoryBoxesString + addedString;
        }
    }
    // COPY STRING TO CLIPBOARD //
    //    ADDS BOLDED STRING    //
    copyToClipboard(categoryBoxesString);
    document.getElementById("copybox").innerHTML = "&#10064; Copied";
    setTimeout(ChangeCopyLabel, 1000);
};

///////  NEW NOTE BUTTON   ///////
document.getElementById("newnote").onclick = function () {
    "use strict";
    if (window.confirm("Are you sure you want to make a new note?")) {
        // CLEARS LOCALSTORAGE FILES
        window.localStorage.removeItem("currentPage");
        window.localStorage.removeItem("checkedBoxes");
        window.localStorage.removeItem("textBox");

        // RELOADS PAGE //
        window.location.reload();
    }
};

//////   CREATE BUTTON   //////
/////   RETRIEVES INPUT   /////
document.getElementById("create").onclick = function () {
    "use strict";
    // COUNTS NUMBER OF OBJECTS   GETS VALUES FROM INPUT FIELD     FINDS EACH CHECKBOX //
    var numObjects = CountNumObjects(localFileObject), descriptionInput = document.getElementById("descriptor").value, textInput = document.getElementById("text").value, checkedBoxes = [], boxesDiv = document.getElementById('boxes'), checkboxes = boxesDiv.getElementsByTagName('input'), z = 0;
    
    // ADDS NEW OBJECT TO LIST //
    localFileObject[numObjects + 1] = Object.create(Object);
    localFileObject[numObjects + 1].Category = categories[categoryCurrent];
    localFileObject[numObjects + 1].Title = textInput;
    localFileObject[numObjects + 1].Output = descriptionInput;

    // UPDATES LOCAL STORAGE //
    window.localStorage.setItem('localChkBoxes', JSON.stringify(localFileObject));

    // HIDES NEW OBJECT MENU //
    document.getElementById("newChkBox").style.display = "none";

    // GETS STRING FROM TEXTBOX //
    call = new SetTextboxLocalStorageValue();
    
    // FOR EACH CHECKBOX //
    for (z = 0; z < checkboxes.length; z += 1) {
        //      IF IT IS CHECKED        //
        // ASSIGN TO CHECKEDBOXES ARRAY //
        if (checkboxes[z].checked) { checkedBoxes.push(checkboxes[z].id); }
    }
    window.localStorage.setItem('checkedBoxes', checkedBoxes);
    window.localStorage.setItem('currentPage', categoryCurrent);
    window.localStorage.setItem('localChkBoxes', JSON.stringify(localFileObject));
    
    // FILLS IN CHECK BOXES WITH NEW VALUE //
    call = new FillInChkBoxes();
};

// XMLHTTPREQUEST ACCESS'S .JSON FILE //
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    "use strict";
    ///// RESETS PROGRAM, PULLS FROM .JSON FILE /////
    function resetLocalStorage() {
        // CLEAR LOCALSTORAGE //
        window.localStorage.clear();
        categoryCurrent = 0;

        //    READS .JSON    //
        //   CLEAN UP TEXT   //
        var rawJSON = JSON.stringify(JSON.parse(xhttp.responseText)), cleanJSON = "", i = 0, u = 1, ChkBoxes = {};
        rawJSON = rawJSON.replaceAll('[', '');
        rawJSON = rawJSON.replaceAll(']', '');
        cleanJSON = rawJSON.match(/\w+|"[^"]+"/g);
        i = cleanJSON.length;
        while ((i = i - 1) > 0) { cleanJSON[i] = cleanJSON[i].replace(/"/g, ""); }

        // CREATE OBJECT FOR EACH JSON SEGMENT /
        for (i = 1; u < cleanJSON.length; i += 1) {
            ChkBoxes[i] = Object.create(Object);
            ChkBoxes[i].Category = cleanJSON[u];
            ChkBoxes[i].Title = cleanJSON[u + 2];
            ChkBoxes[i].Output = cleanJSON[u + 4];
            u += 6;
        }
        //  SETS LOCAL STORAGE == NEW OBJECT //
        window.localStorage.setItem('localChkBoxes', JSON.stringify(ChkBoxes));
        // RELOAD PAGE //
        window.location.reload();
    }
    //////  RESET LOCALSTORAGE BUTTON  //////
    document.getElementById("resetLocalStorage").onclick = function () {
        if (window.confirm("Are you sure you want to reset everything?!")) {
            resetLocalStorage();
        }
    };
};
////// End XMLHTTP JSON Call //////
xhttp.open("GET", "data.json", true);
xhttp.send();
    
///////  ON PAGE LOAD   /////
// FILLS IN EACH CHECK BOX //
call = new FillInChkBoxes();
