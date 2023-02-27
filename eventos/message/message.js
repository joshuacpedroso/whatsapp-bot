const prefix = "!";
const { Collection } = require("@discordjs/collection");
const { List } = require("whatsapp-web.js");
const mp4 = require('../../comandos/youtube/mp4.js')
const tiktokmp4 = require('../../comandos/tiktok/mp4.js')

const tiktokmp3 = require('../../comandos/tiktok/mp3.js');
const mp3 = require("../../comandos/youtube/mp3.js");

module.exports = async (client, message) => { 
  const quotedMsg = await message.getQuotedMessage();
  if(quotedMsg){
 

  if(quotedMsg.body == 'Responda essa mensagem com o link do vídeo'){
   
            mp4.execute(message, client, message.body);

   }
   if(quotedMsg.body == 'Responda essa mensagem com o link do vídeo MP3'){
    mp3.execute(message, client, message.body)
   }
  if(quotedMsg.body == 'Responda essa mensagem com o link do vídeo do tiktok'){
    tiktokmp4.execute(message, client, message.body);

  }
  if(quotedMsg.body == 'MP3 | Responda essa mensagem com o link do vídeo do tiktok'){
    tiktokmp3.execute(message, client, message.body);

  }
  }
    try {
      if (!message.body.startsWith(prefix)) return;

      let args = message.body.trim().split(/ +/);
      const commandName = args[0].slice(prefix.length).toLowerCase();
      const command =
        client.commands.get(commandName) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
        
      if (!command || command === "")
        return message.reply("Comando inválido");
        
      // cooldown
      const author = message.author || message.from;
      
      const { cooldowns } = client;
      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
      }
      
      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 1) * 1000;
      
      if (timestamps.has(author)) {
        const expirationTime = timestamps.get(author) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          
          const list = new List(
            `Desculpe!, Você tem esperar *${timeLeft.toFixed(
              1
            )} segundos* para executar denovo!`,
            "envie denovo",
            [
              {
                title: "Clique para enviar denovo",
                rows: [
                  {
                    title: `${message.body}`,
                  },
                ],
              },
            ],
            "Contagem",
            "Contagem Detectada."
          );
          
          return message.reply(list);
        }
      }
      
      timestamps.set(author, now);
      setTimeout(() => timestamps.delete(author), cooldownAmount);
      
      command.execute(message, client, args,commandName);
    } catch (err) {
      throw err;
    }
   
  }
