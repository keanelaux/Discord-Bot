exports.run = async (bot, message,args) =>{

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't clear messages!");
    message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
    })
}

exports.help = {
    name: 'purge'
}