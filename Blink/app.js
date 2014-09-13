
var j5 = require("johnny-five");

var board = new j5.Board();

var LEDPIN = 13;
var OUTPUT = 1;

board.on("ready", function(){
  var val = 0;

  // Set pin 13 to OUTPUT mode
  this.pinMode(LEDPIN, OUTPUT);

  // Create a loop to "flash/blink/strobe" an led
  this.loop( 1000, function() {
    this.digitalWrite(LEDPIN, (val = val ? 0 : 1));
    console.log("Led = " + val)
  });
});