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
        method: 'GET'
    }).then(function (data) {
    }).catch(function () { });
}