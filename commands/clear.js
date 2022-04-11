module.exports.run = async (bot, message,args) =>{

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't clear messages!");
    if(!args[0]) return message.reply("How many messages do you want to clear?");
    if(parseInt(args[0]) > 99) return message.reply("You can't delete more than 99 messages at a time!");

    message.channel.bulkDelete(parseInt(args[0]) + 1).then(() => {
        message.channel.send(`Cleared ${args[0]} messages!`).then(msg => msg.delete({timeout: 300}));
    }).catch((err) => {
        return message.reply("An error occured!");
    })
}

module.exports.help = {
    name: 'clear'
}