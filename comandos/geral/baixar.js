const Whatsapp = require('whatsapp-web.js');

module.exports = {
    name: "baixar", 
    aliases: ["bx"], 
    descricao: "Baixe algum vídeo", 

    async execute(message, client, args) {
        let sections = [{title:'Plataformas',rows:[{id: 'yt', title:'Youtube'},{id: 'tk', title:'Tiktok'}]}];
        let list = new Whatsapp.List('Escolha uma plataforma','Plataformas',sections,'Plataforma','footer');
        client.sendMessage(message.from, list);

}}