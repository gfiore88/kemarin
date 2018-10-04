var express = require('express'); // Usiamo libreria express per facilitarci il routing // npm install express --save
var cors = require('cors');


var app = express();
app.use(cors()); //INTEGRATO CORS


var config = require('./config.json'); // file di configurazione
var porta = config.porta;
var password = config.password;

var dht = require('./dht_sensors/dht22.js')
var relay = require('./onoff/relay.js');
var pir = require('./onoff/pir.js');
var cam = require('./camera/camera.js');
var device = require('./system/device_commands.js');
var sleep = require('sleep');
var bot = require('./telegram_bot/bot.js');
var lcd = require('./lcd_shield/lcd.js');


/* COMANDI PER LA GESTIONE DEL RELAY (PIN ALTO PIN BASSO) */
app.get('/relay/toggle', function (req, res) { // TOGGLE - INVERTE LO STATO DEL PIN
    res.json({relay_pin: 26, status: relay.toggle()});

});

app.get('/relay/on', function (req, res) { // ON - ATTIVA IL PIN
    res.json({relay_pin: 26, status: relay.on()});

});

app.get('/relay/off', function (req, res) { // OFF - DISATTIVA IL PIN
    res.json({relay_pin: 26, status: relay.off()});

});

app.get('/relay/status', function (req, res) { // GET - OTTIENE LO STATO DEL PIN
    res.json({relay_pin: 26, status: relay.status()});

});


/* FUNZIONI PER LANCIARE COMANDI SUL DEVICE (RESTART, REBOOT, SHUTDOWN) */

app.get('/system/shutdown/' + password, function (req, res) { // comando shutdown + parametro per spegnere
    res.status(200).json({msg: "Il Raspberry si sta spegnendo..."});
    device.execute("halt");

});

app.get('/system/reboot/' + password, function (req, res) { // comando reboot + param per riavviare
    res.status(200).json({msg: "Il Raspberry si sta riavviando..."});
    device.execute("reboot")

});

app.get('/service/restart/' + password, function (req, res) { // comando restart + param per riavviare
    res.status(200).json({msg: "Kemarin Service si sta riavviando..."});
    device.execute("service kemarin restart");

});

app.get('/service/stop/' + password, function (req, res) { // comando stop + param per riavviare
    res.status(200).json({msg: "Kemarin Service si sta stoppando..."});
    device.execute("service kemarin stop");

});

app.get('/service/start/' + password, function (req, res) { // comando start + param per riavviare
    res.status(200).json({msg: "Kemarin Service si sta startando..."});
    device.execute("service kemarin start");

});

/*COMANDI SENSORE TEMPERATURA E UMIDITA */
app.get('/dht/read', function (req, res) { // legge temperatura e umidità
    res.json(dht.read());

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


// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', () => {
    process.exit();
});




