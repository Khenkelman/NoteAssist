var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

    /*############## /////  MAIN  ////// ###############*/   
        
        ///// DECLARE UNIVERSAL VARIABLES /////
        const categories = ["Telehealth","Presentation","Symptoms","Diagnoses","Disruption","Safety","Topics","Stage","Interventions","Response","Strengths","Progress","Tasks"];
        
        
        // GETS LOCALFILE OBJECTS // 
        var localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));
        var localFileString = window.localStorage.getItem('localChkBoxes');
        var localFilePage = window.localStorage.getItem('currentPage');
        var localFileChecked = window.localStorage.getItem('checkedBoxes');
        var localTextBox = window.localStorage.getItem('textBox');

        
        ///// SET CURRENT PAGE == LOCALSTORAGE VALUE /////
        ///                             (OR 0)         ///
        if(!localFilePage){ var categoryCurrent = 0 }
        else{ var categoryCurrent = localFilePage }
        
        
        ///// SET TEXT BOX == LOCALSTORAGE VALUE /////
        ///                     (OR EMPTY)         ///
        if(!localTextBox){ var textHolder = "" }
        else { var textHolder = localTextBox}
        document.getElementById("copiedtext").innerHTML = localTextBox
        
        // FILLS IN EACH CHECK BOX //
        FillInTxtBoxes();
        selectCheckBoxes();
        
        ///// CALL FUNCTIONS /////
        updateTitles();
        
        
        
    /*############## /////  FUNCTIONS  ////// ###############*/
        
        
        //////      PULLS VALUE FROM LOCALSTORAGE       /////
        //// CHECKS EACH BOX THAT WAS PREVIOUSLY CHECKED ////
        function selectCheckBoxes(){
            
            // IF LOCAL FILE EMPTY, ASSIGN VALUE 0 //
            if(!localFileChecked) { var checkedBoxes = " " }
            else{ var checkedBoxes = localFileChecked }
            
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
                        //document.getElementById(checkedArray[y]).checked = true
                        checkboxes[z].checked = true;
                    }
                }
            }
        }
        
        ///// RESETS PROGRAM, PULLS FROM .JSON FILE /////
        function resetLocalStorage (){
            window.localStorage.clear();
            categoryCurrent = 0;
            updateTitles();
            
            //   CLEAN UP TEXT   //
            rawDataCopy = JSON.stringify(JSON.parse(xhttp.responseText));
            var rawData = JSON.stringify(JSON.parse(xhttp.responseText));
            rawData = rawData.replaceAll('[','');
            rawData = rawData.replaceAll(']','');
            rawData = rawData.replaceAll('{','');
            rawData = rawData.replaceAll('}','');
            var cleanData = rawData.match(/\w+|"[^"]+"/g), i = cleanData.length;
            while(i--){ cleanData[i] = cleanData[i].replace(/"/g,""); }

            // CREATE OBJECT FOR EACH JSON SEGMENT /
            const ChkBoxes = {};
            var u = 1;
            for(var i = 1; u < cleanData.length; i++){
                ChkBoxes[i] = new Object();
                ChkBoxes[i].Category = cleanData[u];
                ChkBoxes[i].Title = cleanData[u + 2];
                ChkBoxes[i].Description = cleanData[u + 4];
                ChkBoxes[i].Output = cleanData[u + 6];
                u += 8;
            }

            //  SETS LOCAL STORAGE == NEW OBJECT //
            window.localStorage.setItem('localChkBoxes', JSON.stringify(ChkBoxes));
            location.reload();
        }
        
        
        
        
        //////   WRITES IN EVERY OBJECT IN    //////
        /////   LOCALFILE INTO CHECKBOXES     //////
        function FillInTxtBoxes() {
            
            // GETS LOCALFILE OBJECT // 
            var localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));
            
            // COUNTS NUMBER OF OBJECTS // 
            var numObjects = 0;
            for (var prop in localFileObject) {
                if(localFileObject.hasOwnProperty(prop)){
                    numObjects++
                }
            }
            
            // PRINTS CHECKBOXES ON SCREEN //
            var result = "";
            for(var i = 1; i <= numObjects; i++) {
                result += '<div class="' + localFileObject[i].Category + '"><input type="checkbox" id="' + i + '" value "' + localFileObject[i].Output+'" onclick=BoxInteraction("' + i + '")><label for="' + localFileObject[i].Title + '">'
                result += localFileObject[i].Title + '</label><button class=btn id="' + i + '">X</button></div>'
                }
            document.getElementById('boxes').innerHTML = result;
            
            // HIDES CHECKBOXES ON DIFFERENT SCREEN //
            HideChkBoxes()
        } 
        
        
        
        
        //////   HIDES CHECKBOXES IN DIFFERENT CATEGORY    //////
        function HideChkBoxes() {
            
            // GETS LOCALFILE OBJECT // 
            var localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));
            
            // COUNTS NUMBER OF OBJECTS // 
            var numObjects = 0;
            for (var prop in localFileObject) {
                if(localFileObject.hasOwnProperty(prop)){
                    numObjects++
                }
            }
            
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
        
        ////// UPDATES HTML TITLES = CURRENT CATEGORY //////
        function updateTitles(){
            var categoryCurrentString = categories[categoryCurrent]
            document.getElementById("categoryLarge").innerHTML= categoryCurrentString;
            document.getElementById("searchtitle").innerHTML= ("Search " + categoryCurrentString);
        }
        
        
        
    /*############## /////  BUTTONS  ////// ###############*/
        
        //////  RESET LOCALSTORAGE BUTTON  //////
        document.getElementById("resetLocalStorage").onclick = function() {
            resetLocalStorage();  
        }
        
        
        
        
        //////   ADD NEW OBJECT   //////
        document.getElementById("addChkBox").onclick = function() {
            document.getElementById("newChkBox").style.display = "block";
        }
        
        
        
        
        //////   EXIT NEW OBJECT   //////
        document.getElementById("exit").onclick = function() {
            document.getElementById("newChkBox").style.display = "none";
        }
        
        
        
        
        //////   MENU   //////
        document.getElementById("menuIcon").onclick = function() {
            document.getElementById("menu").style.display = "block";
        }
        
        
        
        
        //////   EXIT MENU   //////
        document.getElementById("menuExit").onclick = function() {
            document.getElementById("menu").style.display = "none";
        }
        
        
        
        
        //////   CREATE BUTTON   //////
        /////   RETRIEVES INPUT   /////
        document.getElementById("create").onclick = function() {
            
            // GETS LOCAL OBJECT FILE // 
            var localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));
            
            // COUNTS NUMBER OF OBJECTS // 
            var numObjects = 0;
            for (var prop in localFileObject) {
                if(localFileObject.hasOwnProperty(prop)){
                    numObjects++
                }
            }
            // GETS VALUES FROM INPUT FIELD //
            var descriptionInput = document.getElementById("descriptor").value;
            var textInput = document.getElementById("text").value;
            
            // ADDS NEW OBJECT TO LIST //
            localFileObject[numObjects+1] = new Object();
            localFileObject[numObjects+1].Category = categories[categoryCurrent];
            localFileObject[numObjects+1].Title = textInput;
            localFileObject[numObjects+1].Description = descriptionInput;
            localFileObject[numObjects+1].Output = descriptionInput;
            
            // UPDATES LOCAL STORAGE //
            window.localStorage.setItem('localChkBoxes', JSON.stringify(localFileObject));
            
            // HIDES NEW OBJECT MENU //
            document.getElementById("newChkBox").style.display = "none";
            
            
            
            // GETS STRING FROM TEXTBOX //
            textHolder = document.getElementById("copiedtext").innerHTML
            
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
            window.localStorage.setItem('textBox', textHolder)
            // FILLS IN CHECK BOXES WITH NEW VALUE //
            location.reload();
        }
        
        
        
        
        ////// DECREASES CURRENT CATEGORY //////
        ///////         (ARROW)          ///////
        document.getElementById("arrow1").onclick = function() {
            if (categoryCurrent > 0 && categoryCurrent <= categories.length) {
                    categoryCurrent = categoryCurrent - 1
                document.getElementById("searchbox").value = "";
                
                HideChkBoxes();
                updateTitles();
            }
        }
        
        
        
        
        ////// INCREASE CURRENT CATEGORY //////
        ///////         (ARROW)         ///////
        document.getElementById("arrow2").onclick = function() {
            if (categoryCurrent >= 0 && categoryCurrent < categories.length) {
                    categoryCurrent++
                document.getElementById("searchbox").value = "";
                HideChkBoxes();
                updateTitles();
            }
        }
        
        
        
        //////  COPY BUTTON  //////
        document.getElementById("copybox").onclick = function() {
          textHolder = document.getElementById('copiedtext');
          textHolder.select();
          document.execCommand("copy");
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
        
        
        
        
        ///////// DELETE CHECKBOX ////////
        
        // FIND EACH BUTTON //
        var buttons = document.getElementsByClassName("btn");
        
        //////      FOR EACH BUTTON    //////
        ////// CREATE ONCLICK FUNCTION //////
        for (var i=0; i < buttons.length; i++){
            buttons[i].onclick = function(i){
                
                let confirmAction = confirm("Are you sure you want to delete this option forever?");
                if (confirmAction) {
                    // CREATES CUSTOM OBJECT //
                    const customFileObject = {};

                    // CREATE LIST OF CHECKED BOXES //
                    var checkedBoxes = []

                    // GETS LOCALFILE OBJECT // 
                    var localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));

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
                    var checkboxes = boxesDiv.getElementsByTagName('input');

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
                    textHolder = document.getElementById('copiedtext').innerHTML;

                    // SETS LOCALSTORAGE BEFORE RELOAD //
                    window.localStorage.setItem('checkedBoxes', checkedBoxes)
                    window.localStorage.setItem('currentPage', categoryCurrent)
                    window.localStorage.setItem('localChkBoxes', JSON.stringify(customFileObject));
                    window.localStorage.setItem('textBox', textHolder)

                    // RELOADS PAGE //
                    location.reload();

                }
            }
        }

////// End JSON Call //////
///// * IMPORTANT * ///////
// THIS STAYS AT THE END //
}
};    
xhttp.open("GET", "data.json", true);
xhttp.send();


////// Check Box Select //////
//////  Copy Text Over  //////
function BoxInteraction(x){
    
    var result = document.getElementById("copiedtext").innerHTML
    
    // Gets Local Object File // 
    var localFileObject = JSON.parse(window.localStorage.getItem('localChkBoxes'));
    
    // If checkbox = checked, set result = output //
    if (document.getElementById(x).checked){ 
        result = result + " " + localFileObject[x].Output;
    }
    else{
        result = result.replace((" " + localFileObject[x].Output),'')
    }
    document.getElementById("copiedtext").innerHTML = result
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
    
