$(document).ready(function (){

var Parallax = require('parallax-scroll');

const parallax = new Parallax('.back2', {
  speed: 0.2, // Anything over 0.5 looks silly
});

parallax.animate();

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
  var images = "";

  if (dataSet[0]["@attr"] === undefined) { 
    var lastDate = dataSet[0].date["#text"];
    nowListening += `
                    <h1 class = 'nowListeningText' style = 'color: grey;font-size: 21px; font-weight: bold'>
                    What i've been listening to<i class = "fa fa-music"></i>
                    </h1>
                    <h3 class = 'notListeningText' style = 'color: white; font-size: 10px; margin-top: -9px;'><span style = "color: black"> Updated:</span><br><span style = "rgba(147,147,147, 1)">${lastDate}</span> </h3>
                    <h1 class ='notListeningText' style = 'color: white; font-size: 15px; margin-top: -7px;'>
                      <span style = "color: black">Last Track: </span><br>${lastTrack}<br>
                      ${lastArtist}
                    </h1> 
                    <img class ="lastAlbum" id = "lastAlbum" src = "${lastImg}" style = "margin-bottom: 15px"></img>                  
                  `
}

else if (dataSet[0]["@attr"].nowplaying === "true") {
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
              <img class = 'lastImg' id = 'lastImg' src = '${lastImg}' alt = 'Picture not available :('></img>
              <p class = 'resultText' style = 'color: white; font-size: 14px' id = 'resultText'>
                ${lastalbum}
              </p>
            `
}

$("#recent-tracks").html(`${nowListening}`);


$.get('/recentAlbums', function(data){
data = JSON.parse(data);
console.log(data);
var images = "";
for (var i = 0; i <= 9; i++){ 

images += `

<img class = "albumImages" id = "albumImages" src = "${data.topalbums.album[i].image[3]["#text"]}" alt = "album Images"></img>

`
}


$("#images").html(`<h1 class = "topAlbumText" id = "topAlbumText" style = "color: rgba(100,100,100, 1); font-family: raleyway-thin; font-weight: thin;">Top albums</h1>${images}`)


})


})






















})