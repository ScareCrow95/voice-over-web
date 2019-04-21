var peer = new Peer("receiver", {
  host: "localhost",
  port: 9000,
  path: "/api"
});
var inc;
var conn = peer.connect("caller");

peer.on("call", function(incoming) {
  incoming.answer(null);
  inc = incoming;
  incoming.on("stream", function(stream) {
    var audio = $("<audio autoplay />").appendTo("body");
    audio[0].srcObject = stream;
  });
});
