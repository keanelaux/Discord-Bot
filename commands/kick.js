const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to execute this command!")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.channel.send("Invalid Member Given!")
    if(member.roles.highest.position > message.member.roles.highest.position) return message.channel.send("You can't ban someone with more power than you!");
    let reason = args.slice(1).join(' ');
    if (!reason) { reason = 'No reason provided' }
    member.kick(reason)

    let embed = new Discord.MessageEmbed()
        .setTitle(`:x: **Kicked** :x:`)
        .setColor("RED")
        .setDescription(`Successfully kicked: ${member.user} \n Reason: ${reason}`)
    message.channel.send(embed)
}

exports.help = {
    name: 'kick'
}