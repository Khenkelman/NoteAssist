var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var testData = JSON.parse(xhttp.responseText)
    //print
    var output = '';
    for(var i = 0; i < testData.length; i++){
      //console.log(testData[i].Title)
      output += '<input type="checkbox" id=${testData[i].Title}><label for=${testData[i] .Title}   >'+"  "+testData[i].Title+'</label><br><br>';
    }
    document.getElementById('boxes').innerHTML = output;
  }
};
xhttp.open("GET", "data.json", true);
xhttp.send();