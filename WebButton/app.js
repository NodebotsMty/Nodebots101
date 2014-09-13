/****** EL SERVIDOR *******/
var http = require("http"),
    PORT = 8081,
    HOST = "127.0.0.1";

http.createServer(requestListener).listen(PORT,HOST,function(){
    console.log("Server en linea -> http://localhost" + ":" + PORT);
});

function requestListener(request, response){
    /*
        Obtenemos un arreglo con la informacion contenida en la peticion.
        	Si en al final de la peticion escribimos /led/13/on
        	obtendremos el arreglo ["led", "13", "on"]
    */
    console.log(request.url.slice(1));
    var info = request.url.slice(1).split("/");
    
    if( info[0] === "digitalwrite" && info[1] > 0 && info[1] <= 13 && (info[2]=="1" || info[2]=="0")){
        var led = parseInt(info[1]);
        var state = info[2] == "1" ? true : false;
        response.end("led " + led + " " + (state ? "encendido" : "apagado"));

        // la funcion cambia el estado del led
        toggleLed(led,state);
    }else{
        response.end("invalid request");
    }

}

/****** ARDUINO CON JOHNNY-FIVE *******/
var j5 = require("johnny-five"),
    board = new j5.Board(),
    boardReady = false;

board.on("ready",function(){
    boardReady = true;
});

// esta sera la funcion llamada por el server cuando las peticion sea correcta
function toggleLed(led,on){
    if(boardReady){
        console.log( "cambiando estado de Led ", led, on );
        
        var led = new j5.Led(led);
        if(on){
        	led.on();
        }else{
        	led.off();
        }
    }
}