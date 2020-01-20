const {Hypixel, Mojang} = require('hypixel-node');
const hypixel = new Hypixel(process.env.hypixel);
const Discord = require('discord.js')
const moment = require('moment')
const calculater = require('../calculater/3.js')
const mojang = new Mojang();
module.exports = class guild {
    constructor(){
            this.name = 'guild',
            this.alias = [''],
            this.usage = '!guild'
    }

async run(client, message, args) {
                                let gu = args.join('')
				let guildData = (await hypixel.getGuildByName(gu))
				if(!guildData) return message.channel.send('這個公會不存在')
				let guildRich = new Discord.RichEmbed()
				var target = []
				var i = 0
				let a = new Promise((resolve, reject) => {
                guildData.members.forEach(element => {
					mojang.getName(element.uuid)
					.then(name => {
						target.push(name)
					    i++
						console.log(i)
						if(guildData.members.length <= i) {
							resolve(target)
						} 
					})
					.catch(err => console.log(err))
				});
				
				
			})
			var ranks = []
			    guildData.ranks.forEach(element => {
                   ranks.push(element.name)
				});
				var preferredGames = ''
                a.then(target => {
					console.log(guildData.preferredGames)
				if(!guildData.preferredGames[0]) {
					preferredGames = 'no'
				}else{
					preferredGames = guildData.preferredGames
				}
				guildRich.setThumbnail('https://hypixel.net/data/guild_banners/100x200/' + guildData._id + '.png')
				guildRich.setTitle('Hypixel Guild: ' + guildData.name + ' [' + guildData.tag + ']')
				guildRich.setFooter('Bot | Created by cookie')
				guildRich.setColor('#2DC7A1')
				guildRich.setURL('https://hypixel.net/guilds/' + guildData._id + '/')
                guildRich.addField('TAG', guildData.tag, true)
				guildRich.addField('Member Count', guildData.members.length, true)
				guildRich.addField('PeferredGames', preferredGames, true)
				guildRich.addField('Created', moment(guildData.created).calendar(), true)
				guildRich.addField('Exp', guildData.exp, true)
				guildRich.addField('Level', calculater.getLevel(guildData.exp), true)

				message.channel.send(guildRich)
				message.channel.send('**Members**')
				message.channel.send(target.join(', '))
				})
				message.channel.send('**Ranks**')
				message.channel.send(ranks.join(', '))

}
