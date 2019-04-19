module.exports = class removerole {
    constructor(){
            this.name = 'removerole',
            this.alias = ['rm', 'rr'],
            this.usage = '!removerole'
    }
    async run(bot, message, args) {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
  if(args[0] == "help"){
    message.reply("Usage: !removerole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").split(">");
  let role2 = role[1];
  let role3 = role2.slice(1);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role3);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`RIP, you lost the ${gRole.name} role.`)
  }catch(e){
    message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
  }
}


}
