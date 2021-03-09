const STATES = require('./States').LedStrip;
var ws281x = require("rpi-ws281x-native");


class LedStrip {
    constructor(ledcount, gpio) {
        this.ledcount = ledcount;
        this.gpio = gpio;
        this.pixelData = new Uint32Array(ledcount);
        this.stripState = STATES.BASIC;
        this.lastColor = '#000000';

        this.initHardware();
    }

    switchState(state) {
        this.stripState = state;
        this.offStrip();
    }

    offStrip() {
        this.setAllLeds('#000000');
    }

    setColorInBasicMode(color) {
        if ((this.getState() != STATES.BASIC) && changeState) {
            this.switchState(STATES.BASIC)
        }
        this.setAllLeds(color);
    }

    setAllLeds(color){
        this.lastColor = color;
        this.pixelData.forEach((element, index) => { this.setPixelColor(color, index); });
    }

    setPixelColor(value, pixel) {
        this.pixelData[pixel] = this.getGRB(value);
    }

    // GETTERS  
    getLedCount() {
        return this.ledcount;
    }

    getCurrentColor() {
        if(this.getState() == STATES.BASIC)
            return this.lastColor;
        else
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
        ws281x.render(this.pixelData);
    }

    hardwareReset() {
        ws281x.reset();
    }

    // Hardware initializer
    initHardware() {
        ws281x.init(this.ledcount);
    }
}

module.exports = LedStrip;