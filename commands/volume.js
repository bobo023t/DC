const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const GOOGLE_API_KEY = process.env.API;
const client = new Client({ disableEveryone: true });
const youtube = new YouTube(GOOGLE_API_KEY);

module.exports = class volume {
    constructor(){
            this.name = 'volume',
            this.alias = ['vol'],
            this.usage = '!volume'
    }
    async run(bot, message, args, ops) {
      const serverQueue = ops.active.get(message.guild.id);
      if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
      		if (!serverQueue) return message.channel.send('There is nothing playing.');
      		if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
      		serverQueue.volume = args[1];
      		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
  }
}
