const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const GOOGLE_API_KEY = process.env.API;
const client = new Client({ disableEveryone: true });
const youtube = new YouTube(GOOGLE_API_KEY);

module.exports = class queue {
    constructor(){
            this.name = 'queue',
            this.alias = ['qu'],
            this.usage = '!queue'
    }
    async run(bot, message, args, ops) {
    const serverQueue = ops.active.get(message.guild.id);
    if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
		`);
  }
}
