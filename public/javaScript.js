$(document).ready(function (){

if ($('.navbar-collapse').hasClass('collapse') === true) {
  $('nav button').on('click', () => { 
    $('.collapse').toggle();
    // $('.navbar-collapse').removeClass('.collapse')
  })
}

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
  var lastURL = dataSet[0].url;
  var nowListening = "";
  var images = "";

  if (dataSet[0]["@attr"] === undefined) { 
    var lastDate = dataSet[0].date["#text"];
    console.log("lastDate:" + lastDate);
    var options = { 
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: "America/Los_Angeles",
        timeZoneName: 'short'
    };

   var timeString = lastDate.toLocaleString(options);
   console.log("timeString:" + timeString);
    nowListening += `
                    <h1 class = 'nowListeningText' style = 'color: white;font-size: 21px; font-variant: small-caps; font-family: Raleway; text-shadow: 2px 2px 3px #000'>
                    What i've been listening to<i class = "fa fa-music text-primary"></i>
                    </h1>
                    <h3 class = 'notListeningText' style = 'color: white; font-size: 10px; margin-top: -9px;'><span style = "color: black"> Updated:</span><br><span style = "rgba(147,147,147, 1)">${timeString}</span> </h3>
                    <h1 class ='notListeningText' style = 'color: white; font-size: 15px; margin-top: -7px;'>
                      <span style = "color: black">Last Track: </span><br>${lastTrack}<br>
                      ${lastArtist}
                    </h1>                  
                  <div class = "lastAlbumImage text-center center-block" id = "lastAlbumImage">
                    <img class ="lastAlbum" id = "lastAlbum" src = "${lastImg}"></img>                  
                    <div class = "lastAlbumImageFace" onclick = "window.open('${lastURL}')">
                      <h2 class = "lastArtistName" style = "padding-right: 5%; padding-left: 5%; padding-top: 10%; font-size: 160%; color: white; width: 100%; font-weight: bold">${lastArtist}</h2>
                      <h2 class = "lastAlbumName" style = 'padding-left: 5%; padding-right: 5%; padding-top: 5%; font-size: 135%; font-family: Raleway; color: white; width: 100%;'>${lastalbum}</h2>
                    </div>
                  </div>
    
                  `
}

else if (dataSet[0]["@attr"].nowplaying === "true") {
  nowListening += `
              <h1 class = 'nowListeningText' style = 'font-size: 24px; font-weight: bold; color: white; text-shadow: 2px 2px 3px #000'>
                Now Listening<i class = "fa fa-music text-primary"></i>
              </h1>
              <p class = 'trackText' style = 'color: white; font-size: 18px; font-family: Raleway;'>
                ${lastTrack}
              </p>
              <p class = 'trackText' style = 'margin-top: -10px; color: white'>
                by
              </p>
              <h1 class = 'nowListening Text' style = 'color: white; font-size: 18; margin-top: -15px; font-family: Raleway;'>
                      ${lastArtist}
              </h1>
              <p class = 'resultText' style = 'color: white; font-size: 14px' id = 'resultText'>
                ${lastalbum}
              </p>
              <div class = "lastAlbumImage text-center" id = "lastAlbumImage">
                    <img class = 'lastImg' id = 'lastImg' src = '${lastImg}' alt = 'Picture not available :('></img>
                    <div class = "lastAlbumImageFace" align="center" onclick = "window.open('${lastURL}')">
                      <h2 class = "lastArtistName" style = "padding-right: 5%; padding-left: 5%; padding-top: 10%; font-size: 160%; color: white; width: 100%; font-weight: bold">${lastArtist}</h2>
                      <h2 class = "lastAlbumName" style = 'padding-left: 5%; padding-right: 5%; padding-top: 5%; font-size: 135%; font-family: Raleway; color: white; width: 100%;'>${lastalbum}</h2>
                    </div>
              </div>
            `
}

$("#recent-tracks").html(`${nowListening}`);


$.get('/recentAlbums', function(data){
data = JSON.parse(data);
console.log(data);
var images = "";
for (var i = 0; i <= 9; i++){ 
var url = data.topalbums.album[i].url
var artistName = data.topalbums.album[i].artist.name
var albumName = data.topalbums.album[i].name
images += `
  <div class = "image text-center center-block" id = "image">
    <img class = "albumImages img-responsive" id = "albumImages" src = "${data.topalbums.album[i].image[3]["#text"]}" alt = "album Images"></img>
      <div class = "imageFace" onclick = "window.open('${url}')">
        <h2 class = "artistName" style = "padding-right: 5%; padding-left: 5%; font-size: 100%; color: white; width: 100%; font-weight: bold">${artistName}</h2>
        <h2 class = "albumName" style = 'padding-left: 5%; padding-right: 5%; font-size: 80%; font-family: Raleway; color: white; width: 100%;'>${albumName}</h2>
      </div>
  </div>
        `
    }

$(".images").html(`<h1 class = "topAlbumText" id = "topAlbumText" style = "color: white;font-size: 30px;font-family: Raleway; 
  text-shadow: 2px 2px 3px #000; font-variant: small-caps">Top albums this month:</h1>${images}`)

  })

})






















})