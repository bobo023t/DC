module.exports = class addrole {
    constructor(){
            this.name = 'addrole',
            this.alias = ['ar', 'ad'],
            this.usage = '!addrole'
    }
async run(bot, message, args) {
  //!addrole @andrew Dog Person
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry pal, you can't do that.");
  if(args[0] == "help"){
    message.reply("Usage: !addrole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").split(">");
  let role2 = role[1];
  let role3 = role2.slice(1);
  if(!role2) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find('name', role3);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}.`)
  }catch(e){
    console.log(e.stack);
  }
 }
}
