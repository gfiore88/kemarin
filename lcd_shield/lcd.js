var Lcd = require('lcd');
var dht = require('../dht_sensors/dht22.js');
var intruder = 0;


function getDate() {
    var nDate = new Date().toLocaleString('it-IT', {
        timeZone: 'Europe/Rome',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    });
    return nDate;

}

lcd = new Lcd({
    rs: 25,
    e: 24,
    data: [23, 17, 27, 22],
    cols: 16,
    rows: 2,
    largeFont: false
});

lcd.on('ready', function () {
    read_time_temp_hum();
});


module.exports = {
    setIntruder: function (val) {
        intruder = val;
    },

    clear: function(){
        lcd.clear();
    }
}


function read_time_temp_hum() {
    setInterval(function () {
        if (intruder == 0) {

            lcd.home(function () {
                lcd.setCursor(0, 0);
                lcd.print(getDate() + " ", function (err) {
                    if (err) {
                        throw err;
                    }

                    var temp_hum = dht.read();
                    lcd.setCursor(0, 1);
                    lcd.print('T:' + temp_hum.temperatura + '\xDFC' + ' H:' + temp_hum.umidita + "%", function (err) {
                        if (err) {
                            throw err;
                        }

                    });

                });
            });

        }
        else {
            lcd.clear(function () {
                lcd.setCursor(0, 0);
                lcd.print(" ** Intruso! **", function (err) {
                    if (err) {
                        throw err;
                    }

                });
            });

        }

    }, 1000);


}

process.on('SIGINT', () => {
    lcd.setCursor(0, 0);
    lcd.print("Rebooting... ", function (err) {
        if (err) {
            throw err;
        }

    });
    lcd.close();
});