var j5 = require("johnny-five"),
  board, button;

board = new j5.Board({port:"/dev/tty.RandomBot-DevB"});

board.on("ready", function() {

  button = new j5.Button(8);

  board.repl.inject({
    button: button
  });

  button.on("down", function() {
    console.log("down");
  });

  button.on("hold", function() {
    console.log("hold");
  });

  button.on("up", function() {
    console.log("up");
  });
});