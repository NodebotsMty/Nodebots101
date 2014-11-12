var j5 = require("johnny-five"), 
    board = new j5.Board({port: "/dev/tty.RandomBot-DevB"});

board.on("ready", function() {

  // Create a new `sensor` hardware instance.
  var sensor = new j5.Sensor("A0");

  sensor.scale([ 0, 1023 ]).on("data", function() {
    console.log( this.value );
  });
});	