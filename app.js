var express = require('express');
var app = express();
var sys = require('sys');
var http = require('http')
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }


(function(){
  exec("/usr/local/bin/gpio -g mode 18 pwm", puts);
})()

function start(dir) {

    exec("/usr/local/bin/gpio write 4 "+dir, puts);
    exec("/usr/local/bin/gpio -g pwm 18 10", puts);
}
function stop() {
    exec("/usr/local/bin/gpio -g pwm 18 0", puts);
}

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){

   res.sendfile( 'index.html');

});

app.get('/start', function (req, res) {
    start();
     res.send('start');
      io.sockets.emit('notice', 'The Motor Has Started');

});

app.get('/stop', function (req, res) {
    stop();
    res.send('stop');
    io.sockets.emit('notice', 'The Motor Has Stopped');
});

io.sockets.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('notice', function (data) {
  //  console.log(data);
    io.sockets.emit('notice', data);
  });
});




console.log("hello world");
server.listen(3000);
