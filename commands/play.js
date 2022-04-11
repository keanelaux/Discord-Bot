const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

exports.run = async (bot, message,args) =>{
    let member = message.mentions.members.first();
    const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send('You need to be in a Voice Channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.bot.user); // client might be bot??
        if(!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions');
        if(!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions');
        if(!args.length) return message.channel.send('You need to send the second argument');

        const connection = await voiceChannel.join();

        const videoFinder = async(query) => {
            const videoResult = await ytSearch(query);

            return(videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video) {
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})

            message.reply(`:thumbsup: Now Playing ***${video.title}***`)
        }
        else{
            message.channel.send('No video results found');
        }
}

exports.help = {
    name: 'p',
    description: 'Joins and plays a video from youtube'
}