var GPIO = require('onoff').Gpio;

class Relay {
    constructor(gpio) {
        this.gpio = gpio;

        this.initHardware();
    }

    initHardware(){
        this.relay = new GPIO(this.gpio, 'out');
    }

    set(){
        //GPIO SET
        this.relay.writeSync(0);
    }

    reset(){
        //GPIO RESET
        this.relay.writeSync(1);
    }
}

module.exports = Relay;