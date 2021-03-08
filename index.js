const express = require('express');
const port = 3700;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const apiRoutes = require('./api');

app.use(express.static('public'));

// LEDSTRIP OBJ
var led = require('./obj/ledstrip');

// MAIN ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public' + '/basic.html');
});

app.get('/rosliny', (req, res) => {
    res.sendFile(__dirname + '/public' + '/plants.html');
});

// HTTP CONTROL
app.use('/', apiRoutes);

// SOCKET.IO SIGNALS HANDLE
io.sockets.on('connection', function(socket){
    socket.emit('b_initColor', led.getCurrentColor());

    socket.on('b_changeColor', (data) => {
        led.setAllLeds(data.color);
    }); 
});

http.listen(port, () => {
    console.log(`Listening http://localhost:${port}`)
});