const { MessageEmbed, Message } = require('discord.js');
const pagination = require('discord.js-pagination')
const request = require('node-superfetch');

module.exports = {
    name: 'vaccount',
    description: 'View your account',
    usage: 'v-acc <username> <tag>',
    aliases: ['v-acc'],
    category: 'valorant',
    run: async (client, message, args) => {

        let username = args[0];
        let tag = args[1];

        if (!username || !tag) return message.channel.send('Please enter a username and a tag');

        const region = {
            'ap': '(ap) Asia Pacific',
            'eu': '(eu) Europe',
            'na': '(na) North America',
            'br': '(br) Brazil',
            'latam': '(la) Latin America',
            'kr': '(kr) Korea',            
        }
        
        
        try {

            const { body } = await request.get(`https://api.henrikdev.xyz/valorant/v1/account/${username}/${tag}`);

            const embed = new MessageEmbed()
                .setAuthor(`Valorant Account`, `https://storage.qoo-static.com/game/17607/KGhkiIABcwb0ZdwWMfGGBsHCb6gQbQNX.jpg`)
                .setTitle(`${body.data.name}#${body.data.tag}`)
                .addField('UUID', body.data.puuid)
                .addField('Level', body.data.account_level, true)
                .addField('Region', region[body.data.region], true)
                .addField('Last Update', body.data.last_update, true)
                .setThumbnail(body.data.card.large)
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
                .setTimestamp()


            message.channel.send(embed)

        } catch (err) {
            //return status(err.status).send(err.response.body.message);
            if (err.status === 503) {
                return message.channel.send('Your account is private, please login first at https://tracker.gg/valorant');
            } else if (err.status === 404) {
                return message.channel.send('Account with' + username + '#' + tag + 'not found');
            }   
        } 
    }
}