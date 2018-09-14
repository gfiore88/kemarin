var sensor = require('node-dht-sensor');

var array;

module.exports = {

    leggisensore: function () {

        sensor.read(22, 17, function (err, temperature, humidity) {
            if (!err) {

                console.log('Temp: ' + temperature.toFixed(1) + 'Umid: ' + humidity.toFixed(1));
                var temp = temperature.toFixed(1);
                var hum = humidity.toFixed(1);
                array = {temperatura: temp, umidita: hum};
            }
        });

        return array;

    }


};