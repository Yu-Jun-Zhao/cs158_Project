const signalhub = require('signalhub');
const hub = signalhub('my-video-app', ['https://signalhub-jccqtwhdwc.now.sh']);


hub.subscribe('update').on('data', function(data){
    console.log(data);
});

document.getElementById('connect').addEventListener('click', function(){
    hub.broadcast('update', window.location.hash);
});


document.getElementById('send').addEventListener('click', function(){

  var yourMessage = document.getElementById('yourMessage').value;
  hub.broadcast('update', yourMessage);
  document.getElementById('messages').textContent += 'you ' + '>> ' +  yourMessage + '\n';

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
