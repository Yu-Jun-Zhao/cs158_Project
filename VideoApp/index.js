const signalhub = require('signalhub');
const hub = signalhub('my-video-app', ['https://signalhub-jccqtwhdwc.now.sh']);
//const Peer = require('./Peer.js');

function Peer(name, message){
    this.name = name || "anonymous";
    this.message = message || "";

}

var peer = {};
var you = new Peer(); // This is you.



hub.subscribe('update').on('data', function(data){
    if(peer.name === you.name) return;
    if(!peer[data.name]){
        peer = new Peer(data.name, data.message);
    }
    document.getElementById('messages').textContent += '    ' + data.message + ' << ' + data.name + '\n';

});

document.getElementById('connect').addEventListener('click', function(){
    const yourName = document.getElementById('nameID').value;
    const yourMessage = document.getElementById('yourMessage').value;
    //you = new Peer(yourName, yourMessage);
    you = new Peer(yourName, yourMessage);
    hub.broadcast('update', you);
});


document.getElementById('send').addEventListener('click', function(){

  var yourMessage = document.getElementById('yourMessage').value;
  you.message = yourMessage;

  if(you.message === "") {
      document.getElementById('statusText').innerHTML = "Insert a Text";
  }else{
      document.getElementById('messages').textContent += 'you ' + '>> ' +  yourMessage + '\n';
      document.getElementById('statusText').innerHTML = "";
      hub.broadcast('update', you);
  }

// reset textContent
  document.getElementById('yourMessage').value = "";

})

//setInterval(function(){
    //document.getElementById('messages').textContent += '    ' +
    //console.log("");
//}, 1000);

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
      console.log(location.hash + " is here");
      console.log(data);
      document.getElementById('YourConnectionID').value = JSON.stringify(data);
    })

    document.getElementById('connect').addEventListener('click', function(){
      var otherId = JSON.parse(document.getElementById('OtherID').value)
      if(otherId.value === ""){
        document.getElementById('statuslabel').innerHTML = "No Value in OTHER ID";
      }else{
        document.getElementById('statuslabel').innerHTML = "Connecting";
        peer.signal(otherId);
      }

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
      console.log(location.hash)
      document.body.appendChild(video)

      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
  })
  .catch(function (error) {
    if (error) {
       console.log('failed' + error);
    }
  });


*/
