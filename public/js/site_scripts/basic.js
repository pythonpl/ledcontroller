const socket = io.connect('http://localhost:3700');
socket.on('b_initColor', (data) => {
    $('#picker').empty();
    var colorPicker = new iro.ColorPicker('#picker', { color: data });
    colorPicker.on('color:change', (color) => {
        socket.emit('b_changeColor', { color: color.hexString });
    });
});

function offLed() {
    $.ajax({
        url: '/offLedstrip',
        method: 'POST'
    }).then(function (data) {
    }).catch(function () { });
}

function onRelay(){
    $.ajax({
        url: '/onRelay',
        method: 'POST'
    }).then(function (data) {
    }).catch(function () { });
}

function offRelay(){
    $.ajax({
        url: '/offRelay',
        method: 'POST'
    }).then(function (data) {
    }).catch(function () { });
}