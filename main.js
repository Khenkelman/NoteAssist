var categorySelected = 0;
var categoryCurrent = "Telehealth"
const categories = ["Telehealth","Presentation","Symptoms","Diagnoses","Disruption","Safety","Topics","Stage","Interventions","Response","Strengths","Progress","Tasks"];

function categoryMove(command){
  if(command == "add"&&categorySelected<12){
    categorySelected += 1; 
  }
  if(command == "subtract"&&categorySelected>0){
    categorySelected -= 1; 
  }
  var categoryCurrent = categories[categorySelected];
  document.getElementById('testp').innerHTML = categoryCurrent;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var testData = JSON.parse(xhttp.responseText);
    //print
      var output = '';
      for(var i = 0; i < testData.length; i++){
        if(testData[i].Category == categoryCurrent){
          output += '<input type="checkbox" id=${testData[i].Title}><label for=${testData[i] .Title}   >'+"  "+testData[i].Title+'</label><br><br>';
        }  
      }
      document.getElementById('boxes').innerHTML = output;

    }
  };
  xhttp.open("GET", "data.json", true);
  xhttp.send();

  
}

var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var testData = JSON.parse(xhttp.responseText);
    //print
      var output = '';
      for(var i = 0; i < testData.length; i++){
        if(testData[i].Category == categoryCurrent){
          output += '<input type="checkbox" id=${testData[i].Title}><label for=${testData[i] .Title}   >'+"  "+testData[i].Title+'</label><br><br>';
        }  
      }
      document.getElementById('boxes').innerHTML = output;
      document.getElementById('testp').innerHTML = categoryCurrent;
    }
  };
  xhttp.open("GET", "data.json", true);
  xhttp.send();