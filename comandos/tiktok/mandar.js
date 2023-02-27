const fs = require('fs');
const https = require('https');
const Whatsapp = require('whatsapp-web.js')
module.exports = {
    name: "mandar2323", 
    aliases: [""], 
    showajuda: false,
    async execute(client, message, link) {
        const url = link;
        https.get(url,(res) => {
           let tipo = null
            for(i=0; i<res.rawHeaders.length; i++){
                if(res.rawHeaders[i] == 'Content-Type'){
                    i++;
                    tipo = res.rawHeaders[i++]
                }
            }
        
            const extens = tipo.substring(tipo.indexOf("/") + 1);
            const name = Math.random().toString(36).slice(2);

            const path = `./upload/${name}.${extens}`; 
            const filePath = fs.createWriteStream(path);
            res.pipe(filePath);
            
            filePath.on('finish',() => {
                filePath.close();
                const media = Whatsapp.MessageMedia.fromFilePath(`./upload/${name}.${extens}`);
                client.sendMessage(message.from, media)
            })
        })
    }}