const Whatsapp = require('whatsapp-web.js');
const {Collection} = require('discord.js')
const qrcode = require("qrcode-terminal");

const client = new Whatsapp.Client({
    authStrategy: new Whatsapp.LocalAuth(),
    ffmpegPath: './ffmpeg/bin/ffmpeg.exe',
    puppeteer: {
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  }
});
client.commands = new Collection();
client.cooldowns = new Collection();
["event", "commands"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });

})

client.initialize();
 
process.on('unhandledRejection', (reason, p) => {
  console.log(' [ ANTICLASH ] | SCRIPT REJEITADO');
  console.log(reason, p);
});

process.on("uncaughtException", (err, origin) => {
  console.log(' [ ANTICLASH] | CATCH ERROR');
  console.log(err, origin);
}) 

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(' [ ANTICLASH ] | BLOQUEADO');
  console.log(err, origin);
});