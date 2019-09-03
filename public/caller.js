function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

var peer = new Peer(uuidv4(), {
  host: "10.31.26.40",
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
  // var echoCancellation = MediaTrackSettings.echoCancellation;
  navigator.getUserMedia(
    {
      video: false,
      audio: {
        sampleRate: 48000,
        channelCount: 1,
        volume: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    },

    function success(localAudioStream) {
      // GET AUDIO VOLUME

      // audioContext = new AudioContext();
      // analyser = audioContext.createAnalyser();
      // microphone = audioContext.createMediaStreamSource(localAudioStream);
      // javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      // analyser.smoothingTimeConstant = 0.8;
      // analyser.fftSize = 1024;

      // microphone.connect(analyser);
      // analyser.connect(javascriptNode);
      // javascriptNode.connect(audioContext.destination);
      // javascriptNode.onaudioprocess = function() {
      //   var array = new Uint8Array(analyser.frequencyBinCount);
      //   analyser.getByteFrequencyData(array);
      //   var values = 0;

      //   var length = array.length;
      //   for (var i = 0; i < length; i++) {
      //     values += array[i];
      //   }

      //   var average = values / length;

      //   console.log(Math.round(average));
      //   // colorPids(average);
      // };

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
  console.log("hanging up");
  outgoing.close();
}
