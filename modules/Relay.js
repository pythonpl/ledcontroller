class Relay {
    constructor(gpio) {
        this.gpio = gpio;

        this.initHardware();
    }

    initHardware(){
        
    }

    set(){
        //GPIO SET
        console.log('Relay set!');
    }

    reset(){
        //GPIO RESET
        console.log('Relay reset!');
    }
}

module.exports = Relay;