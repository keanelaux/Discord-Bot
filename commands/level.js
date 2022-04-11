const Levels = require('discord-xp');
const Discord = require('discord.js');
const canvacord = require('canvacord');
const xpfile = require("../xp.json");
const fs = require('fs');

exports.run = async (bot, message, args) => {
    try {
        const rank = new canvacord.Rank()
            .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setCurrentXP(xpfile[message.author.id].xp)
            .setLevel(xpfile[message.author.id].level)
            .setRequiredXP(xpfile[message.author.id].reqxp)
            .setStatus(message.author.presence.status)
            .setProgressBar('#FFA500', "COLOR")
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)
        rank.build()
            .then(data => {
                const attactchment = new Discord.MessageAttachment(data, 'rankcard.png')
                message.channel.send(attactchment);
            })
    } catch (err) {
        console.log(err);
    }
    //console.log(message.guild.roles)
}
exports.help = {
    name: 'level'
}

