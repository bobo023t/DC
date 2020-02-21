const Discord = require('discord.js')
const bot = new Discord.Client();
const token = process.env.token;
const { CommandHandler } = require("djs-commands")
const active = new Map();
const prefix = require('./commands/prefixes.json')
const ownerID = '483564053898199040';
const ver = require('C:/Users/Bobo/Desktop/DC-master/verfify/mc.js')
const fs = require('fs')
const CH = new CommandHandler({
    folder: __dirname + '/commands/',
    prefix: [prefix.prefix]
  });
var target = ('')
var target1

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
     //if(!cmd) return;

      try{
          cmd.run(bot, message, args, ops)
      }catch(e){
          //console.log(e)
      }
    if(args[0] == 'vertify'){
	if(message.author.id != '494520333739753472' || message.author.id != '648457616384851990' )
    message.channel.send('按下❤️驗證')
      .then(function (message) 
      {message.react('❤️')
      target = message.id
      fs.writeFile('target.json', target, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
    })
    }
  });
  bot.on('raw', packet => {
  fs.readFile('target.json', function (err, data) {
      if (err)
          console.log(err);
      else
          target1 = data.toString()
  });
  // We don't want this to run on unrelated packets
  if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
  // Grab the channel to check the message from
  const channel = bot.channels.get(packet.d.channel_id);
  // There's no need to emit if the message is cached, because the event will fire anyway for that
  if (channel.messages.has(packet.d.message_id)) return;
  // Since we have confirmed the message is not cached, let's fetch it
  channel.fetchMessage(packet.d.message_id).then(message => {
      // Emojis can have identifiers of name:id format, so we have to account for that case as well
      const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
      // This gives us the reaction we need to emit the event properly, in top of the message object
      const reaction = message.reactions.get(emoji);
      // Adds the currently reacting user to the reaction's users collection.
      if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));
      // Check which type of event it is before emitting
      if (packet.t === 'MESSAGE_REACTION_ADD') {
          bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
      }
      if (packet.t === 'MESSAGE_REACTION_REMOVE') {
          bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
      }
  });
});
bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.message.id == target || target1){
      if (user.bot) return;
      reaction.remove(user)
      ver.run(bot, reaction.message, user)
    }else{
      
    }
})
bot.on('messageReactionRemove', (reaction, user) => {
})

bot.login(token)
