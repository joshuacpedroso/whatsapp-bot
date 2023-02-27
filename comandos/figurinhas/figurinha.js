const fs = require('fs')
const Whatsapp = require('whatsapp-web.js');

module.exports = {
    name: "figurinha", 
    aliases: ["fg"],
    descricao: "Envie uma imagem com !figurinha para criar sua figurinha", 
    async execute(message, client, args) {
        if(!message.hasMedia) return message.reply("Mas você não enviou nenhuma imagem ou vídeo :(")
        const media = await message.downloadMedia();
        const string = media.mimetype;
        const extens = string.substring(string.indexOf("/") + 1);
        const name = Math.random().toString(36).slice(2);
       
    
       
    
        fs.writeFile(
            "./upload/" + `${name}.${extens}`,
            media.data,
            "base64",
            function (err) {
              if (err) {
                console.log(err);
              }else{
                const sticker = Whatsapp.MessageMedia.fromFilePath(`./upload/${name}.${extens}`);
                client.sendMessage(message.from ,sticker, { sendMediaAsSticker: true });
               
              }
            }
        )
        
    },
  };
  