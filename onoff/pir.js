const Gpio = require('onoff').Gpio;
var lcd = require('../lcd_shield/lcd.js');

const pir = new Gpio(12, 'in', 'both');

pir.watch(function (err, value) {

    if (err) {
        console.log("NIENTE");
        console.log(err);
        exit();
    }

        if (value == 1){
            console.log("value " + value);
            lcd.setIntruder(1);
            console.log('Intruder detected');
        }
        else
        {
            console.log("value " + value);
            lcd.setIntruder(0);
            console.log('Intruder exited');
            lcd.clear();
        }



});


module.exports = {};


process.on('SIGINT', () => {
    console.log("PASSO QUI");
    pir.unexport();
});