const {Extra, Markup} = require('telegraf');
const Telegraf = require('telegraf');
var dht = require('../dht_sensors/dht22');
var relay = require('../onoff/relay.js');

const bot = new Telegraf("620520590:AAGWbZQ7L-rS5t4wo5HjJUjdscLYAnU1-X8");


bot.start((message) => {
    console.log('Bot inizializzato da:', message.from.id)
    return message.reply('Benvenuto su Këmarin BOT! Scrivi /lista per iniziare');
});


bot.command('lista', ({reply}) => {
    return reply('Benvenuto su Këmarin! Cosa vuoi visualizzare?', Markup
        .keyboard([
            ['🌡️ Temperatura/Umidità'], // Row1 with 2 buttons
            ['✅ Accendi Luce', '❌ Spegni Luce'], // Row2 with 2 buttons
            ['📷 Webcam', '🌐️ Vai al sito'] // Row3 with 2 buttons
        ])
        .extra()
    )
})


bot.hears('🌡️ Temperatura/Umidità', (ctx) => {
    var temphum = dht.read();
    var tempint = parseInt(temphum.temperatura)
    var txt = "🌡 La Temperatura è di <b>" + temphum.temperatura + "°C</b>\n" +
        "💧 L'umidità è del <b>" + temphum.umidita + "%</b>\n\n";
    if (tempint <= 4) {
        txt += "⛄️ <b>Ehi ragazzi qui si gela!</b>";
    }
    else if (tempint >= 5 && tempint <= 9) {
        txt += "🥶 <b>Sembra faccia davvero freddo lì fuori!</b>";
    }
    else if (tempint >= 10 && tempint <= 23) {
        txt += "🤧 <b>Hey copriti bene e attento ai colpi d'aria!</b>";
    }
    else if (tempint >= 24 && tempint <= 30) {
        txt += "😎 <b>Che bell'arietta primaverile!</b>";
    }
    else if (tempint >= 31) {
        txt += "😳 <b>Fuuuuuf che caldo ragazzi!</b>";
    }

    ctx.replyWithHTML(txt);
});

bot.hears('✅ Accendi Luce', (ctx) => {
    var txt = "🔆️ Perfetto! <b>Ho acceso la luce!</b>";
    relay.on();
    ctx.replyWithHTML(txt);
});

bot.hears('❌ Spegni Luce', (ctx) => {
    var txt = "🔅️ Come vuoi! <b>Ho spento la luce!</b>";
    relay.off();
    ctx.replyWithHTML(txt);
});


bot.on('callback_query', (ctx) => {
    return ctx.editMessageReplyMarkup({}) //Empty markup
});

bot.startPolling();