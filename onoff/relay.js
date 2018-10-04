const Gpio = require('onoff').Gpio;
const relay = new Gpio(26, 'high');

module.exports = {

    toggle: function () {
        relay.writeSync(relay.readSync() ^ 1);
        return relay.readSync();
    },

    on: function () {
        relay.writeSync(0);
        return relay.readSync();
    },

    off: function () {
        relay.writeSync(1);
        return relay.readSync();
    },

    status: function () {
        return relay.readSync();
    }



}


process.on('SIGINT', () => {
    console.log("PASSO QUI");
    relay.unexport();
});