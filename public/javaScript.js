$(document).ready(function (){

var wikiTopMargin = Math.floor(document.getElementById("twitchHeight").height/85) + "%";

console.log(wikiTopMargin);



$("#wikiView").css('margin-top', `${wikiTopMargin}`)

$.get("/lastFM", function(d){ 
  d = JSON.parse(d);
  console.log(d);
})

$.get("/recentTracks", function(data){ 
  data = JSON.parse(data);
  var dataSet = data.recenttracks.track;
  console.log(dataSet);
dataSet.forEach(function (value, index){

  var value = []
  value += value.push(value);

console.log(value);
})

value.forEach(function(item) {

  console.log(item);
  
})





})






















})