var express = require('express');
const port = 3700;
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public' + '/basic.html');
});

app.get('/rosliny', (req, res) => {
    res.sendFile(__dirname + '/public' + '/plants.html');
});

http.listen(port, () => {
    console.log(`Listening http://localhost:${port}`)
});