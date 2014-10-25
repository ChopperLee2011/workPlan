var express = require('express');
var bodyParser = require('body-parser');
var spawn = require('child_process').spawn;
var app = express();
var http = require('http').Server(app);
var fs = require('fs');

var io = require('socket.io').listen(http);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use("/lib", express.static(__dirname + '/lib'));
app.use("/js", express.static(__dirname + '/javascript'));


http.listen(8080, function() {
    console.log('App listening on port 8080');
});

app.post('/api/plan', function(req, res) {
    var param = req.body.formdata;
    var computeNum = 0;
    var outFile = fs.openSync(__dirname + '/public/outFile','w');
    //var javaArgv = [param.days,param.col1,param.col2].concat(param.data);
    // console.log('Turn to Java param : ' + param.days);
    var result = spawn('java', ['test', param], {
        detached: true,
        stdio: ['ignore', outFile, outFile]
    });
    // result.stdout.on('data', function(data) {

    // });
    // result.stderr.on('data', function(data) {
    //     console.log('stderr: ' + data);
    // });
    // result.on('close', function(code) {
    //     console.log('child process exited with code ' + code);
    //     // io.on('connection', function(socket) {
    //     //     console.log('a user connected');
    //     //     io.emit('getResult', computeNum);
    //     // })
    // });
    result.unref();
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
});
