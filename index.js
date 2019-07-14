const Discord = require('discord.js')
const bot = new Discord.Client();
const token = process.env.token
const { CommandHandler } = require("djs-commands")
const active = new Map();
const prefix = require('./commands/prefixes.json')
const ownerID = '483564053898199040';
const CH = new CommandHandler({
    folder: __dirname + '/commands/',
    prefix: [prefix.prefix]
  });

bot.on('ready', () => {
  	bot.user.setStatus('online')
  	bot.user.setActivity('!help')

  	console.log('The bot has been initialized!')

  	let installedGuilds = bot.guilds.array().sort((a, b) => a.members.array().length > b.members.array().length ? 1 : -1)

  	console.log('This bot is available on ' + installedGuilds.length + ' guilds:')

  	let totalMembers = 0

  	for (let i = 0; i < installedGuilds.length; i++) {
  		totalMembers += installedGuilds[i].memberCount
  		console.log(installedGuilds[i].name + ': ' + installedGuilds[i].memberCount + ' members')
  	}

  	console.log('Total members: ' + totalMembers)
  })
bot.on("message", (message) => {
     if(message.author.type === 'bot') return;
     let args = message.content.split(" ");
     let command = args[0];
     let cmd = CH.getCommand(command);
     const ops = {
       ownerID: ownerID,
       active: active
     }
     if(!cmd) return;

      try{
          cmd.run(bot, message, args, ops)
      }catch(e){
          console.log(e)
      }

  });


bot.login(token)
