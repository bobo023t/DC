const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const GOOGLE_API_KEY = process.env.API;
const client = new Client({ disableEveryone: true });
const youtube = new YouTube(GOOGLE_API_KEY);

module.exports = class pause {
    constructor(){
            this.name = 'pause',
            this.alias = ['pause'],
            this.usage = '!pause'
    }
    async run(bot, message, args, ops) {
      const serverQueue = ops.active.get(message.guild.id);
      if (serverQueue && serverQueue.playing) {
  			serverQueue.playing = false;
  			serverQueue.connection.dispatcher.pause();
  			return message.channel.send('??Paused the music for you!');
  		}
  		return message.channel.send('There is nothing playing.');
}
}
