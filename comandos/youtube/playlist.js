const Whatsapp = require('whatsapp-web.js');
const axios = require('axios');
const fs = require('fs');
const ytdl = require('ytdl-core');
const archiver = require('archiver');

module.exports = {
    name: "playlist", 
    aliases: [""], 
    showajuda: false,
    async execute(message, client, link) {
        
        const dir = Math.random().toString(36).slice(2);
        fs.mkdirSync(`./upload/${dir}`);
        client.sendMessage(message.from, "Isso pode demorar alguns minutos")
        const options = {
            method: 'GET',
            url: 'https://youtube-search-and-download.p.rapidapi.com/playlist',
            params: {
              id: 'PLN8t6tH1OSPJwMNqsTIDnaNipanYztInl',
              next: '4qmFsgJhEiRWTFBMV3dBeXBBY0ZSZ0tBSUlGcUJyOW95LVpZWm5peGFfRmoaFENBRjZCbEJVT2tOSFZRJTNEJTNEmgIiUExXd0F5cEFjRlJnS0FJSUZxQnI5b3ktWllabml4YV9Gag%3D%3D'
            },
            headers: {
              'X-RapidAPI-Key': '5cd41d6042msha0856a7b0f9ff56p15aca6jsnf2f45eec1dbb',
              'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
        for(i = 0; i<response.data.contents.length; i++){
           
                const id = response.data.contents[i].video.videoId
             
                    const videoUrl = id
                    const name = Math.random().toString(36).slice(2);

                    ytdl(videoUrl, {filter: 'audioonly'})
                    .pipe(fs.createWriteStream(`./upload/${dir}/${name}.mp3`));                   
                 
        }
      setTimeout(() => {
        const archive = archiver('zip', { zlib: { level: 9 }});
        const stream = fs.createWriteStream(`./upload/${dir}.zip`);
       
        return new Promise((resolve, reject) => {
          archive
            .directory(`./upload/${dir}`, false)
            .on('error', err => reject(err))
            .pipe(stream)
          ;
      
          stream.on('close', () => {
            resolve();
           
          });
          archive.finalize();
          setTimeout(() => {
          },10000)
          
        });
      },30000)  
    }).catch(function (error) {
        console.error(error);
    }); 
    
   
}}
