
//Variables Globales
var statistics = {
  "democrat": 0,	
  "independent": 0,
  "republican": 0,
  "totales": 0,
  "democratsPartyPercentage": 0,
  "independentPartyPercentage": 0,
  "republicanPartyPercentage": 0,
  "totalPartyPercentage": 0,
  "leastLoyalty": [],
  "mostLoyalty": [],
  "leastEngaged": [],
  "mostEngaged": [],
}



function calcAverage(averageArray) {
  var sum = averageArray.reduce((total, amount)=> total + amount.votes_with_party_pct,0);  
  if (averageArray.length === 0)
    return 0;
  else
    return sum / averageArray.length;
}

function votesPartyAvg() {
  var arrayDemocrat = members.filter(member => member.party == "D");
  var arrayIndependent = members.filter(member => member.party == "I");	
  var arrayRepublican = members.filter(member => member.party == "R");

  statistics.democrat = arrayDemocrat.length;
  statistics.independent = arrayIndependent.length;
  statistics.republican = arrayRepublican.length;
  statistics.totales = statistics.democrat + statistics.republican + statistics.independent;
  statistics.democratsPartyPercentage = calcAverage(arrayDemocrat).toFixed(2);
  statistics.independentPartyPercentage = calcAverage(arrayIndependent).toFixed(2); 
  statistics.republicanPartyPercentage = calcAverage(arrayRepublican).toFixed(2);  
  statistics.totalPartyPercentage = calcAverage(members).toFixed(2);
}

function calcTenPct(keyName,keyVote,ascendent) { 
  var mySortedArray = members.sort((a,b) => ascendent ? a[keyName] - b[keyName] : b[keyName] - a[keyName]); 
  var pctNumber = (mySortedArray.length * 0.10).toFixed(0);

  for (var i = 0; i < pctNumber ; i++) {
    statistics[keyVote].push(mySortedArray[i]);
  }

  while (mySortedArray[i][keyName] === mySortedArray[i-1][keyName]) {
    statistics[keyVote].push(mySortedArray[i]);
    i++;
  }
}

function calculations()  {
  members = data.results[0].members;

  votesPartyAvg();
  calcTenPct("votes_with_party_pct","leastLoyalty",true);
  calcTenPct("votes_with_party_pct","mostLoyalty",false);
  calcTenPct("missed_votes_pct","leastEngaged",true);
  calcTenPct("missed_votes_pct","mostEngaged",false);
}

calculations();

// Declaracion del Vue
var app = new Vue({
  el: '#app',
  data: {
    tStats: statistics
  }
});
