const { MessageFlags } = require('discord.js');
const Whatsapp = require('whatsapp-web.js');
const mp4 = require('../../comandos/youtube/mp4.js')
module.exports = async (client, message) => { 
  //listas
    if(message.body == 'Youtube'){
        let button = new Whatsapp.Buttons('Forma de download',[{body:'MP3'},{body:'MP4'}],'Youtube','Bot Isaac');
        client.sendMessage(message.from, button);
    }
    if(message.body == 'Tiktok') {
        let button = new Whatsapp.Buttons('Forma de download',[{body:'Música'},{body:'Vídeo'}],'Tiktok','Bot Isaac');
        client.sendMessage(message.from, button);
    }


    //botoes

    if(message.body == 'MP3'){
        client.sendMessage(message.from, "Responda essa mensagem com o link do vídeo MP3")   
    }
    if(message.body == 'MP4'){
        client.sendMessage(message.from, 'Responda essa mensagem com o link do vídeo')
    }

    //tiktok button 

    if(message.body == 'Música'){
        client.sendMessage(message.from, 'MP3 | Responda essa mensagem com o link do vídeo do tiktok')
    }
    if(message.body == 'Vídeo') {
        client.sendMessage(message.from, 'Responda essa mensagem com o link do vídeo do tiktok')

    }
}