
const Whatsapp = require('whatsapp-web.js');
const WomboDream = require('dream-api');
const fs = require('fs')

module.exports = {
    name: "gerar", 
    aliases: ["gr"], 
    descricao: "Gere uma imagem linda com a I.A Dream!", 

    async execute(message, client, args) {

        const link = args[1];
        if(!link) return message.reply("Cadê a palavra chave?")
        message.reply("Estou processando o pedido...")
        if(!message.hasMedia){
            WomboDream.generateImage(1, link).then(async image => {
                const media = await Whatsapp.MessageMedia.fromUrl(image.result.final);
                client.sendMessage(message.from, media);
     
              });
        }else{
            const media = await message.downloadMedia();
            const string = media.mimetype;
            const extens = string.substring(string.indexOf("/") + 1);
            const name = Math.random().toString(36).slice(2);
            fs.writeFile(
                "./upload/" + `${name}.${extens}`,
                media.data,
                "base64",
               async function (err) {
                  if (err) {
                    console.log(err);
                  }else{

                    let buffer = fs.readFileSync(`./upload/${name}.${extens}`);
                     WomboDream.generateImage(1, link, null, buffer, "LOW").then(async image => {
                        const media = await Whatsapp.MessageMedia.fromUrl(image.result.final);
                        client.sendMessage(message.from, media);
                        });

                  }})
        }
       
       
    }}