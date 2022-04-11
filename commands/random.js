exports.run = async (bot, message,args) =>{
    let member = message.mentions.members.first();
    let getRandomNumber = function (start, range) {
        let getRandom = Math.floor((Math.random() * range) + start);
        while (getRandom > range) {
            getRandom = Math.floor((Math.random()* range) + start);
        }
        return getRandom;
    }

    //let number = Math.floor(Math.random() * 10) + 5;
    message.channel.send(`Your random number is: ${getRandomNumber(1, 100)}.`)
    //console.log(getRandomNumber(500,1000));

}

exports.help = {
name: 'random'
}