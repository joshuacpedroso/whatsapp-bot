
const fs = require('fs')
const Whatsapp = require('whatsapp-web.js');
const Canvas = require('canvas')
module.exports = {
    name: "meme", 
    aliases: ["mm"], 
    descricao: "Crie algum meme", 

    async execute(message, client, arg) {
        const mensageme = arg.join(" ")
        const mensagem = mensageme.substring(mensageme.indexOf(" ") + 1);
        if (!mensagem) return message.reply('Qual será o texto do meme?')

        if(mensagem.length > 44) return message.reply("Ultrapassou o limite de palavras!")
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
                context.font = '60px Impact';
               

                context.strokeStyle = 'black'
                context.lineWidth = 5;
                context.textAlign = 'center' // combined with canvas.width/2 centers text
                context.fillStyle = 'white';
                context.fillText(mensagem, background.width/2, 100);
                var imageData = context.getImageData(x, y, background.width, background.height);
               
                context.putImageData(imageData, x, y);
        
          const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync(`./upload/${name}.png`, buffer)
            const media = Whatsapp.MessageMedia.fromFilePath(`./upload/${name}.png`);
            client.sendMessage(message.from,media);
            
        
        
               
              }
            })
    }}