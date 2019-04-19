const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
module.exports = class play {
    constructor(){
            this.name = 'play',
            this.alias = ['p'],
            this.usage = '!play'
    }
async run(bot, message, args, opt) {
 if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel.');
 //if (message.guild.me.voiceChannel) return message.channel.send('Please join my voice channel');
 if (!args[1]) return message.reply('Sorry,please input a youtube url following the command');
 let validate = await ytdl.validateURL(args[1]);
 if (!validate) return message.reply('Please input a ***void*** URL following the command');
 let info = await ytdl.getInfo(args[1]);
 let data = opt.active.get(message.guild.id) || {};
 if (!data.connection) data.connection = await message.member.voiceChannel.join()
 if (!data.queue) data.queue = [];
 data.guildID = message.guild.id;

 data.queue.push({
   songTitle: info.title,
   requester: message.author.tag,
   url: args[1],
   announceChannel: message.channel.id
 });
 if (!data.dispatcher) play(client, opt, data);
 else {
   message.channel.send(`Added To Queue: ${info.title} | Requested By: ${message.author}`);
 }
 opt.active.set(message.guildID, data)

 async function play(client, opt, data){
   client.channel.get(data.queue[0].announceChannel).send(`Now Playing ${data.queue[0].songTitle} | Requested By ${data.queue[0].requester}`);
   data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter:'audioonly'}));
   data.dispatcher.guildID = data.guildID;
   data.dispatcher.once('finish', function() {
     finish(client, opt, this);


   });

 }
 function finish(client, opt, dispatcher){
   let fetched = opt.active.get(dispatcher.guildID);
   fetched.queue.shift();
  if (fetched.queue.length > 0){
    opt.active.set(dispatcher.guildID, fetched)
    play(client, opt, fetched);
  } else {
    opt.active.delete(dispatcher.guildID);
    let vc = client.guild.get(dispatcher.guildID).me.voiceChannel;
    if (vc) vc.leave();
  }
 }
 }
}
