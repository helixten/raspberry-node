var express = require('express');
var app = express();
var sys = require('sys');
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


app.get('/', function(req, res){

   res.sendfile( 'index.html');

});

app.get('/start', function (req, res) {
    start();
     res.send('start');

});

app.get('/stop', function (req, res) {
    stop();
    res.send('stop');
});





console.log("hello world");
app.listen(3000);
