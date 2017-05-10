$(document).ready(function (){
  $("#submitButton").click(()=>{
    handleContactSubmit();
  });

if ($('.navbar-collapse').hasClass('collapse') === true) {
  $('nav button').on('click', () => { 
    $('.collapse').toggle();
    $('back2').toggleClass('greyBack');
    // $('.navbar-collapse').removeClass('.collapse')
  })
}

$.get("/lastFM", function(d){ 
  d = JSON.parse(d);
})

$.get("/recentTracks", function(data){ 
  data = JSON.parse(data);
  var dataSet = data.recenttracks.track;
  var lastArtist = dataSet[0].artist["#text"];
  var lastalbum = dataSet[0].album["#text"];
  var lastImg = dataSet[0].image[3]["#text"];
  var lastTrack = dataSet[0].name;
  var lastURL = dataSet[0].url;
  var listening = "";
  var images = "";

  if (dataSet[0]["@attr"] === undefined){ 
    var lastDate = dataSet[0].date["#text"];
    var offset = new Date().getTimezoneOffset();
    var a = moment(Date.parse(lastDate)).subtract(offset, 'minutes');
    var timeString = a.format("ddd, MMM Do YYYY, h:mm a");

    listening += `
                    <h1 class = 'nowListeningText' style = 'color: white;font-size: 21px; font-variant: small-caps; font-family: Raleway; text-shadow: 2px 2px 3px #000'>
                      What i've been listening to<i class = "fa fa-music text-primary"></i>
                    </h1>
                    <h3 class = 'notListeningText' style = 'color: white; font-size: 14px; margin-top: -9px;'><span style = "color: white; text-shadow: 2px 2px 3px #000; font-family: 'Oswald';"> 
                      Updated:
                      <br>
                      <span style = "rgba(147,147,147, 1);text-shadow: 2px 2px 3px #000; font-family: 'Raleway'; font-size: 14px;">
                      ${timeString}
                      </span> 
                    </h3>
                    <h1 class ='notListeningText' style = "color: white; font-size: 20px; font-weight: bold; margin-top: -7px; text-shadow: 2px 2px 3px #000; font-family: 'Raleway'; font-variant: small-caps;">
                      <span style = "color: white; text-shadow: 2px 2px 3px #000; font-family: 'Oswald'; font-size: 14px">
                      Last Track: 
                      </span>
                      <br>
                      ${lastTrack}
                      <br>
                      ${lastArtist}
                    </h1>                  
                  <div class = "lastAlbumImage text-center center-block" id = "lastAlbumImage">
                    <img class ="lastAlbum" id = "lastAlbum" src = "${lastImg}"></img>                  
                    <div class = "lastAlbumImageFace" onclick = "window.open('${lastURL}')">
                      <h2 class = "lastArtistName" style = "padding-right: 5%; padding-left: 5%; padding-top: 10%; font-size: 4vh; color: white; width: 100%; font-family: 'Raleway'; font-weight: bold;">${lastArtist}</h2>
                      <h2 class = "lastAlbumName" style = "padding-left: 5%; padding-right: 5%; padding-top: 5%; font-size: 3vh; font-family: 'Raleway'; color: white; width: 100%; font-weight: bold;">${lastalbum}</h2>
                    </div>
                  </div>
    
                  `
}

else if (dataSet[0]["@attr"].nowplaying === "true") {
  listening += `
              <h1 class = 'nowListeningText' style = 'font-size: 24px; font-weight: bold; color: white; text-shadow: 2px 2px 3px #000'>
                Now Listening<i class = "fa fa-music text-primary"></i>
              </h1>
              <p class = 'trackText'>
                ${lastTrack}
              </p>
              <p style = 'margin-top: -5px; margin-bottom: 2px; color: white; text-shadow: 2px 2px 3px #000'>
                by
              </p>
              <h1 class = 'nowListeningText'>
                      ${lastArtist}
              </h1>
              <div class = "currentAlbumImage text-center" id = "lastAlbumImage">
                    <img class = 'currentAlbum' id = 'currentAlbum' src = '${lastImg}' alt = 'Picture not available :('></img>
                    <div class = "currentAlbumImageFace" align="center" onclick = "window.open('${lastURL}')">
                      <h2 class = "currentArtistName">${lastArtist}</h2>
                      <h2 class = "currentAlbumName">${lastalbum}</h2>
                    </div>
              </div>
            `
}

$("#recent-tracks").html(`${listening}`);


$.get('/recentAlbums', function(data){
data = JSON.parse(data);
var images = "";
for (var i = 0; i <= 11; i++){ 
var url = data.topalbums.album[i].url
var artistName = data.topalbums.album[i].artist.name
var albumName = data.topalbums.album[i].name
var rank = data.topalbums.album[i]["@attr"].rank;
var albumImages = data.topalbums.album[i].image[3]["#text"];

var topAlbumText = "";

topAlbumText += ` <h1 class = "topAlbumText" id = "topAlbumText">Top albums this month:</h1> 
          `
images += `

  <div class = "image text-center" id = "image">
    <img class = "albumImages img-responsive" id = "albumImages" src = "${albumImages}" alt = "Album image not found :("></img>
      <div class = "imageFace" onclick = "window.open('${url}')">
        <h2 class = "artistName">${artistName}</h2>
        <h2 class = "albumName">${albumName}</h2>
        <h2 class = "rank">Rank: <br>${rank}</h2>
      </div>
  </div>
        `
    }
$(".topAlbumText").html(`${topAlbumText}`)
$(".images").html(`${images}`)

  })

})

var email,name,phone,message;
let handleContactSubmit = function(){
  console.log('submitted')
  email=$("#email").val();
  name=$("#name").val();
  phone=$("#phone").val();
  message=$("#message").val();

  $.post('/signup', {email: email, name: name, phone: phone, message: message})
  .done(d => {
    $("#form-messages").text(d);
    $("#email").val('');
    $("#name").val('');
    $("#phone").val('');
    $("#message").val('');
  }).fail(e => {
    console.log(e)
  })
}

})