const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first();
    const { guild } = message

    const { name, region, memberCount, owner, afkTimeout } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
        .setTitle(`Server info for ***"${name}"***`)
        .setThumbnail(icon)
        .setColor("#3366ff")
        .addFields(
            {
                name: 'Region',
                value: region,
            },
            {
                name: 'Members',
                value: memberCount,
            },
            {
                name: 'Owner',
                value: owner.user,
            },
            {
                name: 'AFK Timeout',
                value: afkTimeout / 60,
            }
        )

    message.channel.send(embed)

}

exports.help = {
    name: 'sinfo'
}