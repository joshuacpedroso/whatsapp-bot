const fs = require('fs')
const prefix = '!'

module.exports = {
    name: "ajuda", 
    aliases: ["aj"],
    descricao: "Exibe um menu de ajuda", 
 
    async execute(message, client, args) {
            if (!args[1]) {
                const categories = []
            
                fs.readdirSync('./comandos/').forEach((dir) => {
                  const commands = fs
                    .readdirSync(`./comandos/${dir}`)
                    .filter(file => file.endsWith('.js'))
                    .map(file => {
                      const commandProps = require(`../../comandos/${dir}/${file}`)
                      if(commandProps.showajuda != false){
                      return `${commandProps.name}`
                      }
                    })
                    .filter(i => i !== undefined)
            
                  if (commands.length > 0) categories.push("*" + dir.toUpperCase()+ "*" + '\n' +  commands.join(' ') + '\n')
                 
                })
               
                  
                    client.sendMessage(message.from, `📄Lista de comandos \n  ${categories} \n para mais informações utilize !ajuda + nome do comando`)
              
                
            
              } else {
                const command = client.commands.get(args[1].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[1].toLowerCase()))
                if (command === undefined) {
                  message.reply("Comando não encontrado, utilize !ajuda")
            
                }else{
            
                
            
                message.reply(`📄 Informações do comando \n Nome: ${command.name} \n Descrição: ${command.descricao} \n Utilizações: ${command.aliases}`)
                }
              }
    },
};