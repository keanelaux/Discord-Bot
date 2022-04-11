module.exports = {
    name: 'message',
    execute(message, args, bot) {
        if(message.author.bot) return;
        if(message.channel.type =='dm') return;
        if(!message.content.startsWith(bot.prefix));
    },
};