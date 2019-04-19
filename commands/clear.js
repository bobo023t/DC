module.exports = class clear {
    constructor(){
            this.name = 'clear',
            this.alias = ['c'],
            this.usage = '!clear'
    }

async run(bot, message, args) {
  //!clear 15
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("oof.");
  if(!args[0]) return message.channel.send("oof");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

}
