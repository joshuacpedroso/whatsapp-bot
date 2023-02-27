const axios = require("axios");
const fs = require('fs');

module.exports = {
    name: "musica", 
    aliases: ['ms'], 
    descricao: "Quer saber a letra de alguma música? Envie um áudio da música tocando", 

    async execute(message, client, args) {
        const quotedMsg = await message.getQuotedMessage();
        if(!quotedMsg) return message.reply("Você tem que citar o áudio da música!")
        const media = await quotedMsg.downloadMedia();
        const name = Math.random().toString(36).slice(2);
       
       
    
        fs.writeFile(
            "./upload/" + `${name}.mp3`,
            media.data,
            "base64",
            function (err) {
              if (err) {
                console.log(err);
              }else{
        var data = {
            'api_token': '1dd71078398ba52b6ebdb23426ac9c57',
            'file':  fs.createReadStream(`./upload/${name}.mp3`),
            'return': 'apple_music,spotify',
        };
        
        axios({
            method: 'post',
            url: 'https://api.audd.io/',
            data: data,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
            if(response.data.result == null){
                client.sendMessage(message.from, 'Não consegui achar essa música... Desculpa')

            }else{
            client.sendMessage(message.from, `Nome da Música: *${response.data.result.title}* \n Artista: *${response.data.result.artist}* \n Link: ${response.data.result.song_link}`)
            }
        })
        .catch((error) =>  {
            console.log(error)
            client.sendMessage(message.from, 'Ocorreu um erro... Lembre-se o arquivo do áudio precisa ter menos de 20 Segundos. Tente enviar denovo!')
        });
    }})
    }}