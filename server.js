const PORT = 3001;

var fs = require('fs');
var http = require('http');
var server = new http.Server(handleRequest);
var io = require('socket.io')(server);

var connected = 0;

io.on('connection', function(socket){
    console.log('omg a user!');
    var user = 'USER ' + connected;
    var color = 'gray';
    connected++;
    socket.on('message', function(data){
        io.emit('message', {
            message: data,
            color: color,
            user: user
        });
    });
    socket.on('color', function(newColor){
        color = newColor;
    });
    socket.emit('welcome', {message: 'who are you ' + user});
});



function handleRequest(req, res) {
  switch(req.url) {
    case '/':
    case '/index.html':
      fs.readFile('public/index.html', function(err, data){
        if(err){
        }
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
      break;
    case '/simple-chat.css':
      fs.readFile('public/simple-chat', function(err, data){
        if(err){}
        res.setHeader("Content-Type", "text/css");
        res.end(data);

      });
      break;
    case '/simple-chat.js':
      fs.readFile('public/simple-chat.js', function(err, data){
        if(err){}
        res.setHeader("Content-Type", "text/js");
        res.end(data);

      });
      break;
  }
}

server.listen(PORT, function(){
  console.log(PORT);
});
