var express = require('express');
var app = express();
var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
function start() {
    exec("/usr/local/bin/gpio -g pwm 18 10", puts);
}
function stop() {
    exec("/usr/local/bin/gpio -g pwm 18 0", puts);
}


app.get('/', function (req, res) {
    res.send('command: ' + req.query.command + 'dir: ' + req.query.dir);
   // res.send('dir: ' + req.query.dir);
    switch (req.query.command) {
        case "start":
            start();
            break;
        case "stop":
            stop();
            break;
        default:
            break;

    }
});
console.log("hello world");
app.listen(3000);