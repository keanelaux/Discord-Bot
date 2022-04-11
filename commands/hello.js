exports.run = async (bot, message,args) =>{
        let member = message.mentions.members.first();
        if(!member){ message.channel.send('Hi');} else {
            message.channel.send(`Hi ${member.user}`)
        }     
}

exports.help = {
    name: 'hello'
}