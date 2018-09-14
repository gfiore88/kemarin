var express = require('express'); // Usiamo libreria express per facilitarci il routing // npm install express --save
var app = express();

var sensor_temphum = require('./dht22.js');

var config = require('./config.json'); // file di configurazione
var porta = config.porta;
var password = config.password;

var relay = require('./gpio-onoff.js');
var cam = require('./camera.js');

var device = require('./device_commands.js');




/* COMANDI PER LA GESTIONE DEL RELAY (PIN ALTO PIN BASSO) */
app.get('/toggle', function (req, res) { // TOGGLE - INVERTE LO STATO DEL PIN
    // risposta in JSON
    res.json(relay.toggle());

});

app.get('/on', function (req, res) { // ON - ATTIVA IL PIN
    // risposta in JSON
    res.json(relay.on());

});

app.get('/off', function (req, res) { // OFF - DISATTIVA IL PIN
    // risposta in JSON
    res.json(relay.off());

});

app.get('/get', function (req, res) { // GET - OTTIENE LO STATO DEL PIN
    // risposta in JSON
    res.json(relay.get());

});


/* FUNZIONI PER LANCIARE COMANDI SUL DEVICE (RESTART, REBOOT, SHUTDOWN) */

app.get('/shutdown/:' + password, function (req, res) { // comando shutdown + parametro per spegnere
    res.status(200).send("Il Raspberry si sta spegnendo...");
    device.execute("halt");

});

app.get('/reboot/:' + password, function (req, res) { // comando reboot + param per riavviare
    res.status(200).send("Il Raspberry si sta riavviando...");
    device.execute("reboot")

});

app.get('/servicerestart/:' + password, function (req, res) { // comando reboot + param per riavviare
    res.status(200).send("Kemarin service si sta riavviando...");
    device.execute("service kemarin restart");

});

app.get('/servicestop/:' + password, function (req, res) { // comando reboot + param per riavviare
    res.status(200).send("Kemarin service si sta stoppando...");
    device.execute("service kemarin stop");

});

app.get('/servicestart/:' + password, function (req, res) { // comando reboot + param per riavviare
    res.status(200).send("Kemarin service si sta startando...");
    device.execute("service kemarin start");

});

/*COMANDI SENSORE TEMPERATURA E UMIDITA */
app.get('/readTempHum', function (req, res) { // legge temperatura e umidità
    res.json(sensor_temphum.leggisensore());
});

/* COMANDI WEBCAM */

app.get('/camera/open', function (req, res) { // legge le camere
    res.json(cam.capture());
});

app.get('/camera/list', function (req, res) { // legge le camere
    res.json(cam.list());
});

// Express Route per tutti i comandi API non conosciuti!
app.get('*', function (req, res) {
    res.status(404).send('Comando RESTful API sconosciuto.');
});



var server = app.listen(porta, function () { // server in ascolto sulla porta

    var host = server.address().address;
    var port = server.address().port;

    console.log('Kemarin in ascolto su http://%s:%s', host, port);

});




