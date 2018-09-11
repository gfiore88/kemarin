var express = require('express'); // Usiamo libreria express per facilitarci il routing // npm install express --save
var app = express();

var relay = require('./gpio-onoff.js');

var config = require('./config.json'); // file di configurazione

var exec = require('child_process').exec;

var porta = config.porta;

var password = "1234";


app.get('/toggle', function (req, res) { // processiamo richiesta get verso /toggle

    // risposta in JSON
    res.json(relay.toggle());

});

app.get('/on', function (req, res) { // processiamo richiesta get verso /toggle

    // risposta in JSON
    res.json(relay.on());

});

app.get('/off', function (req, res) { // processiamo richiesta get verso /toggle

    // risposta in JSON
    res.json(relay.off());

});

app.get('/get', function (req, res) { // processiamo richiesta get verso /toggle

    // risposta in JSON
    res.json(relay.get());

});


app.get('/shutdown/:'+password, function (req, res) { // comando shutdown + parametro per spegnere
    res.status(200).send("Il Raspberry si sta spegnendo...");
    execute("halt");

});

app.get('/reboot/:'+password, function (req, res) { // comando reboot + param per riavviare
    res.status(200).send("Il Raspberry si sta riavviando...");
    execute("reboot");

});

app.get('/servicerestart/:'+password, function (req, res) { // comando reboot + param per riavviare
    res.status(200).send("Kemarin service si sta riavviando...");
    execute("service kemarin restart");

});

app.get('/servicestop/:'+password, function (req, res) { // comando reboot + param per riavviare
    res.status(200).send("Kemarin service si sta stoppando...");
    execute("service kemarin stop");

});

app.get('/servicestart/:'+password, function (req, res) { // comando reboot + param per riavviare
    res.status(200).send("Kemarin service si sta startando...");
    execute("service kemarin start");

});

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
    res.status(404).send('Comando RESTful API sconosciuto.');
});

var server = app.listen(porta, function () { // server in ascolto sulla porta

    var host = server.address().address;
    var port = server.address().port;

    console.log('App in ascolto su http://%s:%s', host, port);

});


//funzione execute per eseguire comandi console da remoto via RESTful API
function execute(command) {
    exec(command, function (error, stdout, stderr) {
        console.log('exec: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

