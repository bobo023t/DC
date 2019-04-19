const Discord = require('discord.js')
module.exports = class say {
    constructor(){
            this.name = 'say',
            this.alias = ['tell','s'],
            this.usage = '!say'
    }
async run(bot, message, args) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No");
  if(!args[1]) return message.reply("type something!");
  const say = args.shift();
  let botmessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botmessage);
}
}
