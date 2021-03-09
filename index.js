const express = require('express');
const path = require('path')
const port = 3700;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const apiRoutes = require('./api');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

const INTERVAL = 100;
var running = false;

// LEDSTRIP OBJ
const led = require('./obj/objects').led;

// DB OBJ
const db = require('./obj/objects').query;

// MAIN ROUTES
app.get('/', (req, res) => {
    res.render('basic');
});

app.get('/rosliny', async (req, res) => {
    let schedule = await db.getWholeSchedule();
    res.render('schedule', { schedule : schedule });
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
    running = true;
});


process.on("SIGINT", async () => {
	if (!running) {
		return; // avoid calling shutdown twice
	}
			
	console.log("Shutting down.");
	led.hardwareReset();
    process.nextTick(function () { process.exit(0); });

});

setInterval(function () {
    if(running)
        led.update();
}, INTERVAL)