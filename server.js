var express = require("express");
var app = express();
var fs = require("fs");
var https = require("https");
var ExpressPeerServer = require("peer").ExpressPeerServer;
app.use(express.static(__dirname + "/public"));

app.get("/caller", function(req, res, next) {
  res.sendFile(__dirname + "/public/caller.html");
});

app.get("/receiver", function(req, res, next) {
  res.sendFile(__dirname + "/public/receiver.html");
});

var server = https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert")
    },
    app
  )
  .listen(9000);

var options = {
  debug: true
};

var peerserver = ExpressPeerServer(server, options);

app.use("/api", peerserver);
