var express = require('express')
var bodyParser = require('body-parser');
var app = express();
var spawn = require('child_process').spawn;


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use("/lib", express.static(__dirname + '/lib'));
app.use("/js", express.static(__dirname + '/javascript'));


app.listen(8080, function() {
    console.log('App listening on port 8080');
});

app.post('/api/plan', function(req, res) {
    var param = req.body.plan;
    var computeNum = 0;
    // console.log('Turn to Java param : ' + param.days);
    var result = spawn('java', ['test', param.days]);
    result.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
        computeNum = data;
    });
    result.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });

    result.on('close', function(code) {
        console.log('child process exited with code ' + code);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<html><body>Hello</body></html>');

    });
    // result.kill('SIGINT');
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
});
