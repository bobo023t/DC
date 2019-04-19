const HypixelAPI = require('hypixel-api');
const Discord = require('discord.js');
const token = process.env.hypixel;
const HypixelClient = new HypixelAPI(token);
const rank = require('../calculater/rank.js')
module.exports = class ok {
    constructor(){
            this.name = 'ok',
            this.alias = ['ok'],
            this.usage = '!ok'
    }

  async run(bot, message, args) {
  let id = message.member.displayName.split('<')
  let id1 = id[1];
  if (!id1) return message.reply('Pls change your nickname to *** <minecraftusername>');
  let id2 = id1.slice(0, id1.length - 1)
  let hypixelPlayer
  message.channel.startTyping()
  message.channel.send('Checking...')
  try {
    hypixelPlayer = (await HypixelClient.getPlayer('name', id2)).player
  }
  catch (err) {
    console.log(err)
    message.channel.send('Hmm, that player doesn\'t seem to exist!')
  }
  message.channel.stopTyping()
  if (!hypixelPlayer) return message.reply('no');
  let playerGuild = (await HypixelClient.findGuild('member', hypixelPlayer.uuid));
  let playerGuildID = (await HypixelClient.findGuild('member', hypixelPlayer.uuid)).guild
  let playerGuildName = (await HypixelClient.getGuild(playerGuildID)).guild.name
  let rank1 = rank.generateFormattedRank(hypixelPlayer.rank || hypixelPlayer.packageRank || hypixelPlayer.newPackageRank)
  let rankrole = message.guild.roles.find('name', rank1);
  if (playerGuildID === '5bfe87a06d7ba9963a35042a') {
    let rMember = message.guild.member(message.author)
    let gRole = message.guild.roles.find('name', '普通會員<Member>');
    await(rMember.addRole(rankrole.id));
    await(rMember.addRole(gRole.id));
    return message.reply("welcome");

  }else {
    let role = message.guild.roles.find('name', playerGuildName);
    if (!role) {
      try{
      role = await message.guild.createRole({
        name: playerGuildName,
        color: "#000000",
        permissions:[]
      })
    }catch(e){
      console.log(e.stack);
    }
  }
    let rMember = message.guild.member(message.author)
    let gRole = message.guild.roles.find('name', role);
    await(rMember.addRole(rankrole.id));
    await(rMember.addRole(role.id));
    return message.reply("welcome");
 }
 }
 }
