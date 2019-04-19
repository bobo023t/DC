const Discord = require('discord.js')
module.exports = class unban {
    constructor(){
            this.name = 'unban',
            this.alias = ['ub'],
            this.usage = '!unban'
    }

async run(bot, message, args) {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(args[0] == "help"){
      message.reply("Usage: !ban <user> <reason>");
      return;
    }
    let bUser = args[1]
    let role = args.join(" ").split(">");
    let role2 = role[1];
    let bReason = role2.slice(1);

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~unBan~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.unban(bUser);
    incidentchannel.send(banEmbed);
}

}
