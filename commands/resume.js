const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('../config');
const client = new Client({ disableEveryone: true });
const youtube = new YouTube(GOOGLE_API_KEY);

module.exports = class resume {
    constructor(){
            this.name = 'resume',
            this.alias = ['resume'],
            this.usage = '!resume'
    }
    async run(bot, message, args, ops) {
      const serverQueue = ops.active.get(message.guild.id);
      if (serverQueue && !serverQueue.playing) {
      			serverQueue.playing = true;
      			serverQueue.connection.dispatcher.resume();
      			return message.channel.send('??Resumed the music for you!');
      		}
      		return message.channel.send('There is nothing playing.');
}
}
