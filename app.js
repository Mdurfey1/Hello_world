var express = require('express');
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

var request = require('request');

app.get('/lastFM', function(req, res) {
var lastFMURL = "https://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=almostcrimes_&api_key=cee8eebeb4ff28b14cceee8e805b31b3&period=1month&format=json";
  request(lastFMURL, function (error, response, body) { 
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.send(response.body);
  })
})

app.get('/recentTracks', function(req, res){
var recentTracks = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=almostcrimes_&api_key=cee8eebeb4ff28b14cceee8e805b31b3&format=json"
request(recentTracks, function (error, response, body) { 
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.send(response.body);
  })
})

app.get('/recentAlbums', function(req, res){ 
var recentAlbums = "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=almostcrimes_&period=1month&api_key=cee8eebeb4ff28b14cceee8e805b31b3&format=json"
  request(recentAlbums, function(error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    res.send(response.body);
  })
})

app.post('/signup', function(req, res, next) { 

  console.log(req.body)
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var message = req.body.message;
  var success;


  let transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
      user: 'mpdurfey@gmail.com',
      pass: 'mpdfocusrite!'
    }
  });

  let mailOptions = {
    from: 'mpdurfey@gmail.com',
    to: 'mpdurfey@gmail.com',
    subject: `new contact from ${name}`,
    replyTo: `${email}`,
    html: `<h1 style = "font-size: 12px">${name}<br>${email}<br>${phone}<br></h1><b>${message}</b>`
  };

  transporter.sendMail(mailOptions, (error, info) => { 
    if (error) {
    console.log(error);
  }

res.sendFile(__dirname + '/index.html');
  // res.send(info.response)

  console.log('Message %s sent: %s', info.messageId, info.response, info.accepted)
  })




});


// app.post()

app.listen(port, function () {

  console.log('Example app listening on port 3000!');
  
});
