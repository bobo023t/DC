const Discord = require('discord.js')
const HypixelAPI = require('hypixel-api')
const calculater = require('../calculater/3.js')
const token = process.env.hypixel;
const HypixelClient = new HypixelAPI(token)
const moment = require('moment')
module.exports = class guild {
    constructor(){
            this.name = 'guild',
            this.alias = ['g'],
            this.usage = '!guild'
    }
    async run(bot, message, args, ops) {
      args.shift();
      let gname = args.join(' ');
      message.channel.send(gname)
      message.channel.startTyping()
				let targetGuild = await HypixelClient.findGuild('name', gname)
				message.channel.stopTyping()
				if (targetGuild.guild === null) {
					message.channel.send('Hmm, that guild doesn\'t seem to exist!')
					return
				}

				let guildData = (await HypixelClient.getGuild(targetGuild.guild)).guild

				let guildRich = new Discord.RichEmbed()

				guildRich.setThumbnail('https://hypixel.net/data/guild_banners/100x200/' + guildData._id + '.png')
				guildRich.setTitle('Hypixel Guild: ' + guildData.name + ' [' + guildData.tag + ']')
				guildRich.setFooter('Bot | Created by cookie')
				guildRich.setColor('#2DC7A1')
				guildRich.setURL('https://hypixel.net/guilds/' + guildData._id + '/')
        guildRich.addField('TAG', guildData.tag, true)
				guildRich.addField('Member Count', guildData.members.length, true)
				guildRich.addField('PeferredGames', guildData.preferredGames, true)
				guildRich.addField('Created', moment(guildData.created).calendar(), true)
				guildRich.addField('Exp', guildData.exp, true)
				guildRich.addField('Level', calculater.getLevel(guildData.exp), true)

				message.channel.send(guildRich)
			}
    }
