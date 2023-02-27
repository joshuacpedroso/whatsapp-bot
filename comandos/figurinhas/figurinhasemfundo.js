
const {removeBackgroundFromImageUrl,removeBackgroundFromImageFile} = require("remove.bg")
const fs = require('fs')
const Whatsapp = require('whatsapp-web.js');

module.exports = {
    name: "fgsemfundo", 
    aliases: ["fgsfn"], 
    descricao: "Envie uma imagem com !fgsemfundo para criar sua figurinha sem fundo", 

    async execute(message, client, link) {
        if(!message.hasMedia) return message.reply("Mas você não enviou nenhuma imagem :(")

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
                const localFile = `./upload/${name}.${extens}`;
                const outputFile = `./upload/${name}.png`;
                removeBackgroundFromImageFile({
                  path: localFile,
                  apiKey: "z4QBssE8ZpsBCBPregEEnfZG",
                  size: "regular",
                  type: "auto",
                  scale: "50%",
                  outputFile
                }).then((result) => {
                    const sticker = Whatsapp.MessageMedia.fromFilePath(`./upload/${name}.png`);
                    client.sendMessage(message.from ,sticker, { sendMediaAsSticker: true });
                }).catch((errors) => {
                    client.sendMessage(message.from, "Ocorreu um erro...(Só consigo tirar o fundo se for uma imagem!)");

                });
              }
            }
        )

    }}