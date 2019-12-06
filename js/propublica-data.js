//Llamada Ajax y Seleccion de JSON
onload = (function () {

  if (document.title === "Senate Page") {
    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
  } else if (document.title === "House Page")  {
    url = "https://api.propublica.org/congress/v1/113/house/members.json"
  }

  fetch(url, {
    headers: {						
      "X-API-Key": "J1C6HxYgQBHGR1IfCMG1EEIcNHSP4UmXzs8HkRyJ"
    }
  })

    .then(response => response.json())

    .then((jsonData) => {

    data = jsonData;
    app.members = data.results[0].members;	
    main();
  });
})

function showFilteredTable() {
  var checkedboxes = document.querySelectorAll("input[name=Party]:checked");	
  var filteredParty = Array.from(checkedboxes).map(element => element.value);
  var partyFilter = member => {
    if(filteredParty.indexOf(member.party) > -1){
      return member;
    }
  }
  mFiltrados = members.filter(partyFilter);

  var state = document.getElementById("filters").value;
  if (state != "All"){
    mFiltrados = mFiltrados.filter(m => m.state == state);
  } 
  app.members = mFiltrados;
}

function createStates() {
  var filters = document.getElementById("filters");
  if (filters != null) {
    var filteredStates = members.map(member => member.state);

    filteredStates = filteredStates.filter((state, i, array) => array.indexOf(state) === i);
    filteredStates.sort();
    filteredStates.forEach(state => {
      var option = document.createElement("option");
      option.value = state;
      option.innerHTML = state;
      filters.appendChild(option);
    });
  }
}

function partySelect() {
  var checkboxes = document.querySelectorAll('input[name=Party]');

  if(checkboxes != null){
    checkboxes.forEach(input => input.onchange = showFilteredTable);
  }
}

function filter() {
  var filters = document.getElementById("filters");

  if(filters != null){
    filters.onchange = showFilteredTable;
  }
}

function main(){
  members = data.results[0].members;	
  
  createStates();
  partySelect();
  filter();
  showFilteredTable();
}

// Declaracion del Vue
var app = new Vue({
  el: '#app',
  data: {
    members : [],
    states: []
  }
});