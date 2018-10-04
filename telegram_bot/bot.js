const {Extra, Markup} = require('telegraf');
const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { leave } = Stage;

var dht = require('../dht_sensors/dht22.js');
var relay = require('../onoff/relay.js');
var switchpin = require('../onoff/switchpin');


const bot = new Telegraf("620520590:AAGWbZQ7L-rS5t4wo5HjJUjdscLYAnU1-X8");
var light = switchpin;
light.setPin(26, 'low');


const main_menu = [['🌡️ Temperatura/Umidità'], // Row1 with 1 buttons
    ['📷 Webcam', '🔆️ Luce ON', '🔅️ Luce OFF'], // Row2 with 2 buttons
    ['🖥 System CMD', '🌐️ Vai al sito']];

const syscmd_menu = [['⬅ Torna Indietro'], ['🔄 Reload Node'], ['💠 Reload Raspberry']];

bot.start((message) => {
    console.log('Bot inizializzato da:', message.from.id)
    return message.reply('Benvenuto su Këmarin BOT! Scrivi /lista per iniziare');
});

bot.command('lista', ({reply}) => {
    return reply('Benvenuto su Këmarin! Cosa vuoi visualizzare?', Markup
        .keyboard(main_menu)
        .oneTime()
        .resize()
        .extra()
    )
});

bot.hears('⬅ Torna Indietro', ({reply}) => {
    return reply('✅ Rieccoti al menu principale!', Markup
        .keyboard(main_menu)
        .oneTime()
        .resize()
        .extra()
    )
});

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

bot.hears('🔆️ Luce ON', (ctx) => {
    var txt;
    if (light.on() == 1) {
        txt = "🔆️ Perfetto! <b>Ho acceso la luce!</b>";
    } else {
        txt = "Problemi nell'accensione della luce";
    }
    ctx.replyWithHTML(txt);
});

bot.hears('🔅️ Luce OFF', (ctx) => {
    var txt;
    if (light.off() == 0) {
        txt = "🔅️ Come vuoi! <b>Ho spento la luce!</b>";
    } else {
        txt = "Problemi nello spegnimento della luce";
    }
    ctx.replyWithHTML(txt);
});

bot.hears('🌐️ Vai al sito', (ctx) => {
    var txt = "➡️ Visita https://www.ke-marin.it";
    ctx.replyWithHTML(txt);
});


bot.hears(['🖥 System CMD'], ({reply}) => {
    return reply('👨‍💻 Scegli un comando da eseguire', Markup
        .keyboard(syscmd_menu)
        .oneTime()
        .resize()
        .extra()
    )
});


bot.on('callback_query', (ctx) => {
    return ctx.editMessageReplyMarkup({}) //Empty markup
});

bot.startPolling();