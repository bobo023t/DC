const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = class ping {
    constructor(){
            this.name = 'ping',
            this.alias = ['pin'],
            this.usage = '!ping'
    }

async run(bot, message, args) {
const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${client.ping}ms`);
}
}
