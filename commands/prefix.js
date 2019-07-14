const Discord = require("discord.js");
const fs = require("fs");
const prefix = ('./prefixes.json');
module.exports = class prefix {
    constructor(){
            this.name = 'prefix',
            this.alias = ['prefix'],
            this.usage = '!prefix'
    }
async run(bot, message, args, ops) {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("No no no.");
  if(!args[0] || args[0 == "help"]) return message.reply("Usage: !prefix <desired prefix here>");

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefix), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Prefix Set!")
  .setDescription(`Set to ${args[0]}`);

  message.channel.send(sEmbed);

}
}
