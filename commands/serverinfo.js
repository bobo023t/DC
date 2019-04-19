const Discord = require('discord.js')
module.exports = class serverinfo {
    constructor(){
            this.name = 'serverinfo',
            this.alias = ['sinfo','si'],
            this.usage = '!serverinfo'
    }

  async run(bot, message, args) {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    message.channel.send(serverembed);
}

}
