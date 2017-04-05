"use strict";

$(document).ready(function () {

  $.get("/lastFM", function (d) {
    d = JSON.parse(d);
    console.log(d);
  });

  $.get("/recentTracks", function (data) {
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
      nowListening += "\n                    <h1 class = 'nowListeningText' style = 'color: rgba(0,0,0, 1);font-size: 21px; font-weight: bold'>\n                    What i've been listening to<i class = \"fa fa-music\"></i>\n                    </h1>\n                    <h3 class = 'notListeningText' style = 'color: white; font-size: 10px; margin-top: -9px;'><span style = \"color: black\"> Updated:</span><br><span style = \"rgba(147,147,147, 1)\">" + lastDate + "</span> </h3>\n                    <h1 class ='notListeningText' style = 'color: white; font-size: 15px; margin-top: -7px;'>\n                      <span style = \"color: black\">Last Track: </span><br>" + lastTrack + "<br>\n                      " + lastArtist + "\n                    </h1> \n                    <img class =\"lastAlbum\" id = \"lastAlbum\" src = \"" + lastImg + "\" style = \"margin-bottom: 15px\"></img>                  \n                  ";
    } else if (dataSet[0]["@attr"].nowplaying === "true") {
      nowListening += "\n              <h1 class = 'nowListeningText' style = 'color: rgba(0,0,0, 1); font-size: 24px; font-weight: bold'>\n                Now Listening<i class = \"fa fa-music\"></i>\n              </h1>\n              <p class = 'trackText' style = 'color: white; font-size: 14px'>\n                " + lastTrack + "\n              </p>\n              <p class = 'trackText' style = 'color: black; margin-top: -10px'>\n                by\n              </p>\n              <h1 class = 'nowListening Text' style = 'color: white; font-size: 18; margin-top: -15px'>\n                      " + lastArtist + "\n              </h1>\n              <img class = 'lastImg' id = 'lastImg' src = '" + lastImg + "' alt = 'Picture not available :('></img>\n              <p class = 'resultText' style = 'color: white; font-size: 14px' id = 'resultText'>\n                " + lastalbum + "\n              </p>\n            ";
    }

    $("#recent-tracks").html("" + nowListening);

    $.get('/recentAlbums', function (data) {
      data = JSON.parse(data);
      console.log(data);
      var images = "";
      for (var i = 0; i <= 9; i++) {

        images += "\n\n<img class = \"albumImages\" id = \"albumImages\" src = \"" + data.topalbums.album[i].image[3]["#text"] + "\" alt = \"album Images\"></img>\n\n";
      }

      $("#images").html("<h1 class = \"topAlbumText\" id = \"topAlbumText\">My top albums this past Month:</h1>" + images);
    });
  });
});
