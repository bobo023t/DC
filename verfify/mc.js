//const HypixelAPI = require('hypixel-api');
const Discord = require('discord.js');
const token = process.env.hypixel;
const {
    Hypixel,
    Mojang
} = require('hypixel-node');
const hypixel = new Hypixel(token);
const mojang = new Mojang();
const rank = require('../calculater/rank.js')
let response
let response2
var tar
var name
var mcname
var boo = false
exports.run = async (client, message, user) => {
    var mee = await message.channel.send(`${user}請輸入你的暱稱`)
    response = await message.channel.awaitMessages(m => m.author.id === user.id, {
        maxMatches: 1,
        time: 10000,
        errors: ['time']
    }).then(async function(arg) {
        mee.delete()
        arg.first().delete()
        name = arg.first().content
        tar = await message.channel.send(`${user}請輸入你的mc id(沒有請輸入"no mc id"注意空格大小寫)`)
        response2 = await message.channel.awaitMessages(m => m.author.id === user.id, {
            maxMatches: 1,
            time: 10000,
            errors: ['time']
        }).then(async function(arg1) {
            tar.delete()
            arg1.first().delete()
            mcname = arg1.first().content
            if (arg1.first().content == 'no mc id') {
                message.guild.fetchMember(user)
                    .then(target => target.setNickname(name + '<' + '>'))
            } else {
                var t1 = await hypixel.getPlayer(mcname)
                if (!t1) {
                    while (!boo) {
                        tar1 = await message.channel.send(`${user}請輸入有效的mc id`)
                        response3 = await message.channel.awaitMessages(m => m.author.id === user.id, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        }).then(async function(w) {
                            tar1.delete()
                            w.first().delete()
                            t1 = await hypixel.getPlayer(w.first().content)
                            if (t1) {
                                boo = true
                                mcname = w.first().content
                            }
                        }).catch(function(err) {
                          console.error(err)
                          tar1.delete()
                          return message.channel.send('超時').then(m => m.delete(5000));
                          boo = true
                      })
                    }
                }
                var user1 = await message.guild.fetchMember(user)
                    
                    user1.setNickname(name + '<' + t1.displayname + '>')
                    let playerGuild = (await hypixel.getGuildByPlayer(t1.uuid));
                    let rank1 = rank.generateFormattedRank(t1.rank || t1.packageRank || t1.newPackageRank)
                    let rankrole = message.guild.roles.find('name', rank1);
                    if (!rankrole) {
                      try{
                      rankrole = await message.guild.createRole({
                        name: rank1,
                        color: "#000000",
                        permissions:[]
                      })
                    }catch(e){
                      console.log(e.stack);
                    }
                  }
                    await(user1.addRole(rankrole.id));
                    if(playerGuild) {
                    let playerGuildID = playerGuild._id
                    let playerGuildName = playerGuild.name
                    if (playerGuildID === '5bfe87a06d7ba9963a35042a') {
                      let gRole = message.guild.roles.find('name', '普通會員<Member>');
                      if (!gRole) {
                        try{
                        gRole = await message.guild.createRole({
                          name: '普通會員<Member>',
                          color: "#000000",
                          permissions:[]
                        })
                      }catch(e){
                        console.log(e.stack);
                      }
                    }
                      await(user1.addRole(gRole.id));
                      return;
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
                  }
                      let friend = message.guild.roles.find('name', '🌈好捧油🌈<Friend>');
                      await(user1.addRole(role.id));
                      await(user1.addRole(friend.id));
                   }
            }

        }).catch(function(err) {
          console.error(err)
          tar.delete()
          return message.channel.send('超時或超過長度').then(m => m.delete(5000));
      })
    }).catch(function(err) {
        console.error(err)
        mee.delete()
        return message.channel.send('超時或超過長度').then(m => m.delete(5000));
    })
}
