const Discord = require('discord.js')
const bot = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
const fs = require('fs');
const { version } = require('os');
const botConfig = require("./config.json")
const { token } = require("./token.json")
const Levels = require('discord-xp')
require('dotenv').config();
const mongoose = require('./database/mongoose');
const xpfile = require("./xp.json");
bot.commands = new Discord.Collection();

Levels.setURL(`mongodb+srv://discordbot:${process.env.PASS}@bot.j55zi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

bot.on('ready', async () => {
    console.log(`${bot.user.username} is online!`)

    fs.readdir('./commands', (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() == 'js')

        if (jsfile.length == 0) { return console.log("Could not find any commands!") }

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })
    bot.user.setActivity("you I am", {type: "WATCHING" })
})

bot.on('message', (message) => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(botConfig.prefix.length) 
    let args = MessageArray.slice(1)

    if (!message.content.startsWith(botConfig.prefix)) return;

    let commandFile = bot.commands.get(cmd);
    if (commandFile) { commandFile.run(bot, message, args) }

})


// Level System
bot.on('message', async (message) => {
    if (message.author.bot) return;

    if (!xpfile[message.author.id]) {
        xpfile[message.author.id] = {
            xp: 0,
            level: 1,
            reqxp: 100,
            last_message: 0,
            xpGained: 0,
            rank: 0
        }

        fs.writeFile("./xp.json", JSON.stringify(xpfile), function (err) {
            if (err) console.log(err)
        })
    }

    if(Date.now() - xpfile.last_message > 60000) {
        var addXP = Math.floor(Math.random() * 62) + 20;
        const MOD_ROLE = '829130789399822366';
        xpfile[message.author.id].xp += addXP
        xpfile.last_message = Date.now();
        xpfile.xpGained = addXP;

        if (xpfile[message.author.id].xp > xpfile[message.author.id].reqxp) {
            xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp
            xpfile[message.author.id].reqxp *= 2
            xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp)
            xpfile[message.author.id].level += 1
            if(xpfile.level >= 6){
                message.member.addRole(MOD_ROLE);
            }

            message.reply("Your are now level **" + xpfile[message.author.id].level + "**!").then
                (msg => msg.delete({ timeout: "10000" }));

        }

        fs.writeFile("./xp.json", JSON.stringify(xpfile), function (err) {
            if (err) console.log(err);
        })
    }
})




bot.on('guildMemberAdd', (member) => {
    let embed = new Discord.MessageEmbed()
        .setTitle('Welcome to my server!')
        .setDescription(`Thank you for joining my server! Make sure to stay active and talk to the other members!\n**Current Member Count:** ${member.guild.memberCount}\n**Owner:** ${member.guild.owner.user}`)
        .setColor('#ff0000')
        .setAuthor(member.guild.owner.user.tag, member.guild.owner.user.avatarURL())
        .setFooter(member.guild.name, member.guild.iconURL())
        .setThumbnail(member.user.avatarURL());

    member.send(embed)
})

mongoose.init();
bot.login(token)
