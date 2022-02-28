// Initializing variables and array of "categories". The whole setup of the site works based on what position of the array you are on, which goes -1 or +1 position if you click the respective arrows on the webpage. The JSON entries have which category they go in listed in the file. You can see your current category above the search bar
var categorySelected = 0;
var categoryCurrent = "Telehealth";
const categories = ["Telehealth","Presentation","Symptoms","Diagnoses","Disruption","Safety","Topics","Stage","Interventions","Response","Strengths","Progress","Tasks"];

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
  document.getElementById('testp').innerHTML = categoryCurrent;
  
  // Start of JSON calling function
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var testData = JSON.parse(xhttp.responseText);
      
    // Printing the list of "Titles" onto webpage. If you need something from the JSON, put it below or above these lines:
      
      var output = '';
      for(var i = 0; i < testData.length; i++){
        if(testData[i].Category == categoryCurrent){
          output += '<input type="checkbox" id=${testData[i].Title})"><label for=${testData[i].Title}>'+"  "+testData[i].Title+'</label><br><br>';
        }  
      }
      document.getElementById('boxes').innerHTML = output;
      
      // above this for JSON code
    }
  };
  xhttp.open("GET", "data.json", true);
  xhttp.send();
  // End of JSON calling function
}

// Right now this function literally just initializes the Telehealth titles when the page loads, because the above function relies on the arrows being clicked to be called. I am going to change this to onload DOM event and we can repurpose this function for other JSON related things, was more of a hotfix
function loadOptions(command){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var testData = JSON.parse(xhttp.responseText);
    //print
      if(command == "textbox"){
        var output = '';
        for(var i = 0; i < testData.length; i++){
          if(testData[i].Category == categoryCurrent){
            output += '<input type="checkbox" id=${testData[i].Title}><label for=${testData[i].Title}>'+"  "+testData[i].Title+'</label><br><br>';
          }
        }
        document.getElementById('boxes').innerHTML = output;
        document.getElementById('testp').innerHTML = categoryCurrent;
      }
    }
  };
  xhttp.open("GET", "data.json", true);
  xhttp.send();
}

loadOptions("textbox");