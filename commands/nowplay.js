const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const GOOGLE_API_KEY = process.env.API;
const client = new Client({ disableEveryone: true });
const youtube = new YouTube(GOOGLE_API_KEY);

module.exports = class nowplay {
    constructor(){
            this.name = 'nowplay',
            this.alias = ['np'],
            this.usage = '!skip'
    }
async run(bot, message, args, ops) {
  const serverQueue = ops.active.get(message.guild.id);
 if (!serverQueue) return message.channel.send('There is nothing playing.');
 return message.channel.send(`🎶Now playing: **${serverQueue.songs[0].title}** required by **${serverQueue.songs[0].requester}**`);
  }
}
