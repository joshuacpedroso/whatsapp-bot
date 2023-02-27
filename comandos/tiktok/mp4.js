const Whatsapp = require('whatsapp-web.js');
const axios = require('axios');
const mandar = require('./mandar');
module.exports = {
    name: "tiktomp4", 
    aliases: [""], 
    showajuda: false,
    async execute(message, client, link) {
        const options = {
            method: 'GET',
            url: 'https://tiktok-downloader-download-videos-without-watermark1.p.rapidapi.com/media-info/',
            params: {link: link},
            headers: {
              'X-RapidAPI-Key': '5cd41d6042msha0856a7b0f9ff56p15aca6jsnf2f45eec1dbb',
              'X-RapidAPI-Host': 'tiktok-downloader-download-videos-without-watermark1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            const link2 = response.data.result.video.url_list[0]
            mandar.execute(client, message, link2)
             
              
          }).catch(function (error) {
              console.error(error);
          });

}}