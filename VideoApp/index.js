/*
navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(function (stream) {
    var Peer = require('simple-peer');
    var peer = new Peer({

      initiator: location.hash === '#init',
      trickle: false,
      stream: stream
    });

    peer.on('signal', function(data) {
      document.getElementById('YourConnectionID').value = JSON.stringify(data);
    })

    document.getElementById('connect').addEventListener('click', function(){
      var otherId = JSON.parse(document.getElementById('OtherID').value)
      peer.signal(otherId)

    })

    document.getElementById('send').addEventListener('click', function(){

      var yourMessage = document.getElementById('yourMessage').value
      peer.send(yourMessage)
    })

    peer.on('data', function(data){
      document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream',function(stream){
      var video = document.createElement('video')
      document.body.appendChild(video)

      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
  })
  .catch(function (error) {
    if (error) {
       console.log('failed');
    }
  });
*/


var getUserMedia = require('getusermedia');

getUserMedia({video: true, audio: false}, function (err, stream) {
    // if the browser doesn't support user media
    // or the user says "no" the error gets passed
    // as the first argument.
    if (err) {
       console.log('failed' + err);
    } else {
       console.log('got a stream', stream);
    }
    var Peer = require('simple-peer');
    var peer = new Peer({

      initiator: location.hash === '#init',
      trickle: false,
      stream: stream
    });

    peer.on('signal', function(data) {
      document.getElementById('YourConnectionID').value = JSON.stringify(data);
    })

    document.getElementById('connect').addEventListener('click', function(){
      var otherId = JSON.parse(document.getElementById('OtherID').value)
      peer.signal(otherId)

    })

    document.getElementById('send').addEventListener('click', function(){

      var yourMessage = document.getElementById('yourMessage').value
      peer.send(yourMessage)
    })

    peer.on('data', function(data){
      document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream',function(stream){
      var video = document.createElement('video')
      document.body.appendChild(video)

      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
  }
);
