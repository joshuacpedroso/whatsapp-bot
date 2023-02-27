
const fs = require('fs')
const Whatsapp = require('whatsapp-web.js');
const Canvas = require('canvas')
module.exports = {
    name: "invertcolorimg", 
    aliases: ["invcolorimg"], 
    descricao: "Envie uma imagem com !imgsemfundo para criar sua imagem com cores invertida", 

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
           async function (err) {
              if (err) {
                console.log(err);
              }else{
                const background = await Canvas.loadImage(`./upload/${name}.${extens}`); 
                const canvas = Canvas.createCanvas(background.width, background.height);

                var context = canvas.getContext('2d');
                var x = 0;
                var y = 0;
            
                context.drawImage(background, x, y);
            
                var imageData = context.getImageData(x, y, background.width, background.height);
                var data = imageData.data;
            
                for(var i = 0; i < data.length; i += 4) {
                  // red
                  data[i] = 255 - data[i];
                  // green
                  data[i + 1] = 255 - data[i + 1];
                  // blue
                  data[i + 2] = 255 - data[i + 2];
                }
            
                // overwrite original image
                context.putImageData(imageData, x, y);
        
          const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync(`./upload/${name}.png`, buffer)
            const media = Whatsapp.MessageMedia.fromFilePath(`./upload/${name}.png`);
            client.sendMessage(message.from,media);
            
        
        
               
              }
            })
    }}