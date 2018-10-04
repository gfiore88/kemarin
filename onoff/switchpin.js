const Gpio = require('onoff').Gpio;
let switchpin;

module.exports = {

    /**
     * Creates an istance of Gpio object
     * @param pin Pin Number (GPIO)
     * @param mode (low or high)
     */
    setPin: function (pin, mode) {
        this.switchpin = new Gpio(pin, mode);
    },

    toggle: function () {
        this.switchpin.writeSync(this.switchpin.readSync() ^ 1);
        return this.switchpin.readSync();
    },

    on: function () {
        this.switchpin.writeSync(1);
        return this.switchpin.readSync();
    },

    off: function () {
        this.switchpin.writeSync(0);
        return this.switchpin.readSync();
    },

    status: function () {
        return this.switchpin.readSync();
    }


}


process.on('SIGINT', () => {
    console.log("PASSO QUI");
    switchpin.unexport();
});