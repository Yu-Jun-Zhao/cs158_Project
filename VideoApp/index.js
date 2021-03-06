// Requires the use of signalHub to help transmit data
// to the other peers that are connected to the server.
const signalhub = require('signalhub');
const hub = signalhub('my-video-app', ['https://signalhub-jccqtwhdwc.now.sh']);

function Peer(name, message){
    this.name = name || "anonymous";
    this.message = message || "";
}

const peer = {};
var you = new Peer(); // This is you.

hub.subscribe('update').on('data', function(data){
    if(data.name === you.name || data.name === "") return;
    if(!peer[data.name]){
        peer[data.name]  = new Peer(data.name, data.message);

    }
    if(data.message !== "")// retrieves message from the app if empty the statement is ignored
        document.getElementById('messages').textContent +=  data.name + ' >> ' + data.message + '\n';
    // if message is empty. ignore
});

// Connects to server when clicked on
document.getElementById('connect').addEventListener('click', function(){
    const yourName = document.getElementById('nameID').value;
    const yourMessage = "is Connected";
    //you = new Peer(yourName, yourMessage);
    you = new Peer(yourName, yourMessage);
    hub.broadcast('update', you);

    document.getElementById('statuslabel').innerHTML = "You: On";
});

// This adds a listener to the send button, thus sends the message if there is one
// to the server.
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

setInterval(function(){
    hub.broadcast('update', new Peer("",""));

}, 1000);
