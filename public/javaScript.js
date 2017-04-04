$(document).ready(function (){


$.get("/lastFM", function(d){ 
  d = JSON.parse(d);
  console.log(d);
})

$.get("/recentTracks", function(data){ 
  data = JSON.parse(data);
  var dataSet = data.recenttracks.track;
  console.log(dataSet);
  var lastArtist = dataSet[0].artist["#text"];
  var lastalbum = dataSet[0].album["#text"];
  var lastImg = dataSet[0].image[3]["#text"];
  var lastTrack = dataSet[0].name;
  var nowListening = "";

if (dataSet[0]["@attr"].nowplaying === "true") {
  nowListening += `
              <h1 class = 'nowListeningText' style = 'color: rgba(0,0,0, 1); font-size: 24px; font-weight: bold'>
                Now Listening<i class = "fa fa-music"></i>
              </h1>
              <p class = 'trackText' style = 'color: white; font-size: 14px'>
                ${lastTrack}
              </p>
              <p class = 'trackText' style = 'color: black; margin-top: -10px'>
                by
              </p>
              <h1 class = 'nowListening Text' style = 'color: white; font-size: 18; margin-top: -15px'>
                      ${lastArtist}
              </h1>
              <img class = 'lastImg' id = 'lastImg' src = '${lastImg}' alt = 'current/last artist picture'></img>
              <p class = 'resultText' style = 'color: white; font-size: 14px' id = 'resultText'>
                ${lastalbum}
              </p>
            `
}
else { nowListening += `
                    <h1 class ='notListeningText' style = 'color: white; font-size: 15px'>
                    Last Track: ${lastTrack}<br>
                    </h1>                    
                  `
}

$("#recent-tracks").html(`${nowListening}`);

dataSet.forEach(function (value, index){




})





})






















})