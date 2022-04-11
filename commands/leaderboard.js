const Levels = require('discord-xp')
const Discord = require('discord.js')
const xpfile = require("../xp.json");

exports.run = async (bot, message, args) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); // We grab top 5 users with most xp in the current server.

    if (rawLeaderboard.length < 1) return message.reply("Nobody's in leaderboard yet.");

    const leaderboard = await Levels.computeLeaderboard(bot, rawLeaderboard, true); // We process the leaderboard.

    const lb = leaderboard.map(e => `***${e.position}***. ${e.username}\n***Level:*** ${e.level}\n***XP:*** ${e.xp.toLocaleString()}\n`); // We map the outputs.

    let embed = new Discord.MessageEmbed()
        .setTitle(`**Leaderboard**`)
        .setColor("RED")
        .addField(`${lb}`)

    message.channel.send(`**Leaderboard**:\n${lb.join("\n")}`);
}

exports.help = {
    name: 'lb'
}