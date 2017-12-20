var express = require('express');
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').config()
var helmet = require('helmet')

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/config'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet())

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

var request = require('request');
const apiKey = process.env.APIKEY;

// app.get('/lastFM', function(req, res) {
//   console.log(req.query.artist)
//   let lastFMURL = 'https://itunes.apple.com/search?term=john+coltrane+quartet&entity=musicArtist'
// // var lastFMURL = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=johncoltranequartet&api_key=${apiKey}&format=json`;
//   request(lastFMURL, function (error, response, body) { 
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     res.send(response.body);
//   })
// })

app.get('/recentTracks', function(req, res){
var recentTracks = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=almostcrimes_&api_key=${apiKey}&format=json`
request(recentTracks, function (error, response, body) { 
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.send(response.body);
  })
})

app.get('/recentAlbums', function(req, res){ 
var recentAlbums = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=almostcrimes_&period=1month&api_key=${apiKey}&format=json`
  request(recentAlbums, function(error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    res.send(response.body);
  })
})

app.post('/signup', function(req, res, next) { 

  
  if (Object.keys(req.body).length !== 0 && req.body.constructor !== Object) { 
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var message = req.body.message;
  



  let transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_USER,
      pass: process.env.ADMIN_PASS
    }
  });

  let mailOptions = {
    to: process.env.ADMIN_USER,
    subject: `new contact from ${name}`,
    html: `<h1 style = "font-size: 12px">${name}<br>${email}<br>${phone}<br></h1><b>${message}</b>`
  };

  transporter.sendMail(mailOptions, (error, info) => { 
    if (error) {
      console.log("HERES THE ERROR: ", error);
    }
    console.log(`Message ${info.messageId} sent: ${info.accepted}`)
  })

}

res.send(`Thanks for the message!`)

});

// app.post()

app.listen(port, function () {

  console.log('Example app listening on port 3000!');
  
});
