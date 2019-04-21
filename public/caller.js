function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

var peer = new Peer(uuidv4(), {
  host: "localhost",
  port: 9000,
  path: "/api"
});

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

var outgoing;

// Get access to microphone

function call() {
  navigator.getUserMedia(
    { video: false, audio: true },

    function success(localAudioStream) {
      if (outgoing) outgoing.close();
      outgoing = peer.call("receiver", localAudioStream);
      console.log("calling");

      outgoing.on("stream", function(stream) {
        console.log("received");
      });
    },
    function error(err) {}
  );
}

function hangup() {
  outgoing.close();
}
