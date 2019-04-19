const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const GOOGLE_API_KEY = process.env.API;
const client = new Client({ disableEveryone: true });
const youtube = new YouTube(GOOGLE_API_KEY);

module.exports = class stop {
    constructor(){
            this.name = 'stop',
            this.alias = ['stop'],
            this.usage = '!stop'
    }
    async run(bot, message, args, ops) {
const serverQueue = ops.active.get(message.guild.id);
if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
serverQueue.songs = [];
serverQueue.connection.dispatcher.end('Stop command has been used!');
}
}
