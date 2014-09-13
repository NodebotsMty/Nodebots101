
var five = require("johnny-five");

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8081);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


io.sockets.on('connection', function (socket) {

  socket.emit('myevent', { hello: 'world' });

  socket.on('myotherevent', function (data) {
    console.log(data);
  });

});


var last_temp = 0;
five.Board().on("ready", function(){
  // read temperature every 3 seconds
  var temp = new five.Sensor({
    pin:"A0", 
    freq:300
  });

  temp.on("read", function(err, value){

    var thermistor = getTemp(value);

    io.sockets.emit("thermistor", thermistor.tempC);

    last_temp = thermistor;
  });
});

function getTemp(volt){
  var tempK, tempC, tempF;

  // get the Kelvin temperature
  tempK = Math.log(((10240000/volt) - 10000));
  tempK = 1 / (0.001129148 + (0.000234125 * tempK) + (0.0000000876741 * 
      tempK * tempK * tempK));

  // convert to Celsius and round to 1 decimal place
  tempC = tempK - 273.15;
  tempC = Math.round(tempC*10)/10;

  // get the Fahrenheit temperature, rounded
  tempF = (tempC * 1.8) + 32;
  tempF = Math.round(tempF*10)/10;

  // return all three temperature scales
  return {
    tempK: tempK,
    tempC: tempC,
    tempF: tempF
  };
}
