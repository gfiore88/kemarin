var exec = require('child_process').exec;


module.exports = {
    //funzione execute per eseguire comandi console da remoto via RESTful API
    execute: function(command) {
            exec(command, function (error, stdout, stderr) {
                console.log('exec: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }
}
