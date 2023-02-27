const { readdirSync } = require("fs");

module.exports = (client, Discord) => {
  console.log("Carregando comandos")
  const commandsFolders = readdirSync("./comandos/");
  for (const folder of commandsFolders) {
    const commandsFiles = readdirSync(`./comandos/${folder}`).filter(
      (files) => files.endsWith(".js")
    );
    for (const file of commandsFiles) {
      const command = require(`../comandos/${folder}/${file}`);
      client.commands.set(command.name, command);
      console.log(command.name)
    }
  }
  console.log("Comandos Carregados")
};