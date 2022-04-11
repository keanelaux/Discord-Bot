exports.run = async (bot, message,args) =>{
    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel) return message.channel.send("You need to be in a voice channel to sotp the music!");
    voiceChannel.leave();
    message.channel.send('Leaving channel :smiling_face_with_tear:');
}

exports.help = {
    name: 'leave',
    description: 'Stop the bot and leave the channel'
}