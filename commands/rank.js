const Discord = require('discord.js')
const xpfile = require('../xp.json')
const canvacord = require('canvacord');
//const { DiscordAPIError } = require("discord.js")
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

    // Level System
    bot.on('message', function (message) {
        if (message.author.bot) return;
        var addXP = Math.floor(Math.random() * 10);
        
        if (!xpfile[message.author.id]) {
            xpfile[message.author.id] = {
                xp: 0,
                level: 1,
                reqxp: 100
            }

            fs.writeFile("./xp.json", JSON.stringify(xpfile), function (err) {
                if (err) console.log(err)
            })
        }

        xpfile[message.author.id].xp += addXP

        if (xpfile[message.author.id].xp > xpfile[message.author.id].reqxp) {
            xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp
            xpfile[message.author.id].reqxp *= 2
            xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp)
            xpfile[message.author.id].level += 1

            message.reply("Your are now level **" + xpfile[message.author.id].level + "**!").then
                (msg => msg.delete({ timeout: "10000" }));

        }

        fs.writeFile("./xp.json", JSON.stringify(xpfile), function (err) {
            if (err) console.log(err);
        })
    })

    let user = message.mentions.users.first() || message.author
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

    // let embed = new Discord.MessageEmbed()
    //     .setTitle("Level Card")
    //     .setColor("RED")
    //     .addField("Level: ", xpfile[user.id].level)
    //     .addField("XP: ", xpfile[user.id].xp + "/" + xpfile[user.id].reqxp)
    //     .addField("XP Required: ", xpfile[user.id].reqxp)
    // message.channel.send(embed)
    
}

module.exports.help = {
    name: 'rank'
}