var sensorLib = require('node-dht-sensor');



// Setup sensor, exit if failed
var sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302
var sensorPin  = 4;  // The GPIO pin number for sensor signal
if (!sensorLib.initialize(sensorType, sensorPin)) {
    console.warn('Attenzione: Problema al Sensore DHT!');
    //process.exit(1);
}
let arrayTempHum = {};

module.exports = {

    read: function () {
        var readout = sensorLib.read();
        var temp = readout.temperature.toFixed(1);
        var hum = readout.humidity.toFixed(1);
        //console.log('Temp:', temp + " - Umid:" + hum);
        arrayTempHum = {temperatura: temp, umidita: hum};
        return arrayTempHum;
    }

};