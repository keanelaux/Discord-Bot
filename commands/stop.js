exports.run = async (bot, message,args) =>{
    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel) return message.channel.send("You need to be in a voice channel to pause the music!");
    voiceChannel.stop();
    message.channel.send('Music paused :smiling_face_with_tear:');
}

exports.help = {
    name: 'pause',
    description: 'Pause the bot'
}