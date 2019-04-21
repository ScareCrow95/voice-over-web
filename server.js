var express = require("express");
var app = express();
var ExpressPeerServer = require("peer").ExpressPeerServer;
app.use(express.static(__dirname + "/public"));

app.get("/caller", function(req, res, next) {
  res.sendFile(__dirname + "/public/caller.html");
});

app.get("/receiver", function(req, res, next) {
  res.sendFile(__dirname + "/public/receiver.html");
});

var server = app.listen(9000);

var options = {
  debug: true
};

var peerserver = ExpressPeerServer(server, options);

app.use("/api", peerserver);
