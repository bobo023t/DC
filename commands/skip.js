const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const GOOGLE_API_KEY = process.env.API;
const client = new Client({ disableEveryone: true });
const youtube = new YouTube(GOOGLE_API_KEY);

module.exports = class skip {
    constructor(){
            this.name = 'skip',
            this.alias = ['skip'],
            this.usage = '!skip'
    }
    async run(bot, message, args, ops) {
      const serverQueue = ops.active.get(message.guild.id);
      if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
    let userCount = message.member.voiceChannel.members.size;
    let required = Math.ceil(userCount/2)
    if(!serverQueue.songs[0].voteSkips) serverQueue.songs[0].voteSkips = [];
    if(serverQueue.songs[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry you already vote for this ${serverQueue.songs[0].voteSkips.length} required.`)
    serverQueue.songs[0].voteSkips.push(message.member.id);
    ops.active.set(message.guild.id, serverQueue);
    if (serverQueue.songs[0].voteSkips.length >= required){
      serverQueue.connection.dispatcher.end('Skip command has been used!');
      message.channel.send('Successfully Skip!')
    }
    message.channel.send(`Successfully voted to skip! ${serverQueue.songs[0].voteSkips.length}/${required} required `)
}
}
