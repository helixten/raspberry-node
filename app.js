var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('command: ' + req.query.id);
});

app.listen(3000);