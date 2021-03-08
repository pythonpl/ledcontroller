const STATES = require('./States').LedStrip;

class LedStrip {
    constructor(ledcount, gpio) {
        this.ledcount = ledcount;
        this.gpio = gpio;
        this.pixelData = new Uint32Array(ledcount);
        this.stripState = STATES.BASIC;

        this.initHardware();
    }

    switchState(state) {
        this.offStrip();
        this.stripState = state;
    }

    offStrip() {
        this.setAllLeds('#000000');
    }

    setAllLeds(color) {
        if (this.getState() != STATES.BASIC){
            this.switchState(STATES.BASIC)
        }
        this.pixelData.forEach((element, index) => { this.setPixelColor(color, index); });
    }

    setPixelColor(value, pixel) {
        this.pixelData[pixel] = this.getGRB(value);
        this.update();
    }

    // GETTERS  
    getLedCount() {
        return this.ledcount;
    }

    getCurrentColor() {
        return '#000000';
    }

    getState() {
        return this.stripState;
    }

    // MISC FUNCTIONS

    // Color converter
    // Used to convert value from RGB to GRB which applies to the led strip
    getGRB(value) {
        let arr = (value.replace('#', '0x')).split('');
        return parseInt('0x' + arr[4] + arr[5] + arr[2] + arr[3] + arr[6] + arr[7], 16);
    }

    // HARDWARE FUNCTIONS

    // Hardware updater
    // Call every time you want to apply changes
    update() {

    }

    // Hardware initializer
    initHardware() {

    }
}

module.exports = LedStrip;