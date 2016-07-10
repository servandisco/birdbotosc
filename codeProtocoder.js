
/*
*   
*   Description This send all recognized words separately to 192.168.3.255 PORT 1337
*   by Carles Gutierrez
*
*/

var  myText;
var counterWords = 0;
var parser; 
var ipServando = "192.168.3.255"; //BroadCast
var portServando = 1337;

//Not working. No idea how to do it. No Examples in Protoder or not easy to find it. var var0 = textview.text(text);
var canvas = ui.addCanvas(0, 0, ui.screenWidth, 500);
var instructions1 = "BirdBots OSC";
var instructions2 = "Steps: 1rs Connect, 2nd Send and Talk";
var instructions3 = "This send all recognized words separately to 192.168.3.255 PORT 1337";
var instructions4 = "by Carles Gutierrez";
//var var5 = canvas.text(instructions, 0, ui.screenHeight - 30);
//var canvas = ui.addCanvas(0, 0, ui.screenWidth, 500);
ui.addText(instructions1, 0, 0);
ui.addText(instructions2, 0, 30);
ui.addText(instructions3, 0, 60);
ui.addText(instructions4, 0, 90);

//var bImageLoaded = ui.addImage(0, 0, "qr.jpg"");
//console.log("bImageLoaded = " + bImageLoaded);

var oscServer = network.createOSCServer(9000).onNewData(function(name, data) { 
    console.log(name + " " + data);
}); 

var client;
ui.addButton("Connect", 0, 130, 500, 200).onClick(function() { 
    client = network.connectOSC(ipServando, portServando); //192.168.3.255 && 192.168.1.136
});

ui.addButton("Send", 0, 200+130, 500, 200).onClick(function() { 
    
    //send Start to OSC
    var o1 = new Array();
    o1.push("sending to "+ipServando);
    o1.push("port "+portServando);
    client.send("StartSendOsc", o1);
    
    media.voiceRecognition(function(text) { 
        console.log(text);
        media.textToSpeech(text);
        myText = text;
        parser = myText.split(" ");
        
        var arrayLength = parser.length;
        for (var i = 0; i < arrayLength; i++) {
            //Send various Osc Word by Word
             media.textToSpeech(parser[i]);
             var o3 = new Array();
             o3.push(parser[i]);
             client.send("/birdbots", o3);
             console.log("birdbots "+parser[i]);
        }

    })

});


/* 
//EVENTS usefull for automatic sensors
var id = app.listenEvent("e1", function(obj) {
    console.log(obj.x);
});

var id = app.listenEvent("e1", function(obj) {
    var o2 = new Array();
    o2.push(obj.x);
    client.send("TextOsc", o2);
    bText2Send = false;
});
*/