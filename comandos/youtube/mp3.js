const Whatsapp = require('whatsapp-web.js');
const axios = require('axios');
const mandar = require('../tiktok/mandar');
module.exports = {
    name: "youtubemp4", 
    aliases: [""], 
    showajuda: false,
    async execute(message, client, link) {
        const options = {
            method: 'GET',
            url: 'https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess',
            params: {
              url: link,
              format: 'mp3',
              responseFormat: 'json',
              lang: 'en'
            },
            headers: {
              'X-RapidAPI-Key': '5cd41d6042msha0856a7b0f9ff56p15aca6jsnf2f45eec1dbb',
              'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {     
        const id = response.data.YoutubeAPI.id
        const options = {
          method: 'GET',
          url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details',
          params: {videoId: id},
          headers: {
            'X-RapidAPI-Key': '5cd41d6042msha0856a7b0f9ff56p15aca6jsnf2f45eec1dbb',
            'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
          }
        };
        axios.request(options).then(function (response) {
          const link = response.data.audios.items[1].url;
          const options = {
            method: 'POST',
            url: 'https://api.encurtador.dev/encurtamentos',
            data: {
              "url": link
            },
          }
          axios.request(options).then(function (response) {
            client.sendMessage(message.from, `Aqui está o seu link para download: ${response.data.urlEncurtada}`);
          })
        }).catch(function (error) {
          console.error(error);
        });
                

              
          }).catch(function (error) {
              console.error(error);
          });

}}