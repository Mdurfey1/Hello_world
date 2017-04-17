'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {

  if ($('.navbar-collapse').hasClass('collapse') === true) {
    $('nav button').on('click', function () {
      $('.collapse').toggle();
      // $('.navbar-collapse').removeClass('.collapse')
    });
  }

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
    var lastURL = dataSet[0].url;
    var listening = "";
    var images = "";

    if (dataSet[0]["@attr"] === undefined) {
      var _options;

      var parseISOLocal = function parseISOLocal(s) {
        var b = s.split(" ");
        var hours = b[3].split(":");
        console.log(b);
        console.log(hours[1] - 7);
        console.log(b[0], b[1], b[2], Number(b[3]) - 700);
      };

      var lastDate = dataSet[0].date["#text"];

      parseISOLocal(lastDate);
      console.log(lastDate);
      var options = (_options = {
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }, _defineProperty(_options, 'day', 'numeric'), _defineProperty(_options, 'localeMatcher', 'lookup'), _options);
      var timeString = lastDate.toLocaleString('en-US', options);
      console.log("timeString:" + timeString);
      listening += '\n                    <h1 class = \'nowListeningText\' style = \'color: white;font-size: 21px; font-variant: small-caps; font-family: Raleway; text-shadow: 2px 2px 3px #000\'>\n                    What i\'ve been listening to<i class = "fa fa-music text-primary"></i>\n                    </h1>\n                    <h3 class = \'notListeningText\' style = \'color: white; font-size: 10px; margin-top: -9px;\'><span style = "color: black; text-shadow: 2px 2px 3px #fff; font-family: \'Oswald\';"> Updated:</span><br><span style = "rgba(147,147,147, 1);text-shadow: 2px 2px 3px #000; font-family: \'Raleway\'; font-size: 12px;">' + timeString + '</span> </h3>\n                    <h1 class =\'notListeningText\' style = "color: white; font-size: 20px; font-weight: bold; margin-top: -7px; text-shadow: 2px 2px 3px #000; font-family: \'Raleway\'; font-variant: small-caps;">\n                      <span style = "color: black; text-shadow: 2px 2px 3px #fff; font-family: \'Oswald\'; font-size: 12px">Last Track: </span><br>' + lastTrack + '<br>\n                      ' + lastArtist + '\n                    </h1>                  \n                  <div class = "lastAlbumImage text-center center-block" id = "lastAlbumImage">\n                    <img class ="lastAlbum" id = "lastAlbum" src = "' + lastImg + '"></img>                  \n                    <div class = "lastAlbumImageFace" onclick = "window.open(\'' + lastURL + '\')">\n                      <h2 class = "lastArtistName" style = "padding-right: 5%; padding-left: 5%; padding-top: 10%; font-size: 160%; color: white; width: 100%; font-family: \'Raleway\'; font-weight: bold;">' + lastArtist + '</h2>\n                      <h2 class = "lastAlbumName" style = "padding-left: 5%; padding-right: 5%; padding-top: 5%; font-size: 135%; font-family: \'Raleway\'; color: white; width: 100%; font-weight: bold;">' + lastalbum + '</h2>\n                    </div>\n                  </div>\n    \n                  ';
    } else if (dataSet[0]["@attr"].nowplaying === "true") {
      listening += '\n              <h1 class = \'nowListeningText\' style = \'font-size: 24px; font-weight: bold; color: white; text-shadow: 2px 2px 3px #000\'>\n                Now Listening<i class = "fa fa-music text-primary"></i>\n              </h1>\n              <p class = \'trackText\'>\n                ' + lastTrack + '\n              </p>\n              <p style = \'margin-top: -5px; margin-bottom: 2px; color: white; text-shadow: 2px 2px 3px #000\'>\n                by\n              </p>\n              <h1 class = \'nowListeningText\'>\n                      ' + lastArtist + '\n              </h1>\n              <p class = \'nowListeningAlbum\' id = \'resultText\'>\n                ' + lastalbum + '\n              </p>\n              <div class = "currentAlbumImage text-center" id = "lastAlbumImage">\n                    <img class = \'currentAlbum\' id = \'currentAlbum\' src = \'' + lastImg + '\' alt = \'Picture not available :(\'></img>\n                    <div class = "currentAlbumImageFace" align="center" onclick = "window.open(\'' + lastURL + '\')">\n                      <h2 class = "currentArtistName">' + lastArtist + '</h2>\n                      <h2 class = "currentAlbumName">' + lastalbum + '</h2>\n                    </div>\n              </div>\n            ';
    }

    $("#recent-tracks").html('' + listening);

    $.get('/recentAlbums', function (data) {
      data = JSON.parse(data);
      console.log(data);
      var images = "";
      for (var i = 0; i <= 9; i++) {
        var url = data.topalbums.album[i].url;
        var artistName = data.topalbums.album[i].artist.name;
        var albumName = data.topalbums.album[i].name;
        var topAlbumText = "";

        topAlbumText += ' <h1 class = "topAlbumText" id = "topAlbumText">Top albums this month:</h1> \n          ';
        images += '\n\n  <div class = "image text-center" id = "image">\n    <img class = "albumImages img-responsive" id = "albumImages" src = "' + data.topalbums.album[i].image[3]["#text"] + '" alt = "album Images"></img>\n      <div class = "imageFace" onclick = "window.open(\'' + url + '\')">\n        <h2 class = "artistName">' + artistName + '</h2>\n        <h2 class = "albumName">' + albumName + '</h2>\n      </div>\n  </div>\n        ';
      }
      $(".topAlbumText").html('' + topAlbumText);
      $(".images").html('' + images);
    });
  });
});
