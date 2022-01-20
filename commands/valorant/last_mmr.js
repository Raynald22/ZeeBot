const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')

module.exports = {
    name: 'v-last_mmr',
    aliases: ['last_mmr'],
    category: 'valorant',
    description: 'Get the last mmr of a player',
    usage: 'v-last_mmr <region><username><tag>',

    run: async (client, message, args) => {

        let region = args[0];
        let username = args[1];
        let tag = args[2];

        if(!region) return message.channel.send('Please specify a region!')
        if(!username) return message.channel.send('Please specify a username!')
        if(!tag) return message.channel.send('Please specify a tag!')

        if (!region && !username && !tag) return message.channel.send('Please provide a region, username and tag.');

        const tier = {
            'Bronze 1': 'https://static.wikia.nocookie.net/valorant/images/a/a2/TX_CompetitiveTier_Large_6.png/revision/latest/scale-to-width-down/250?cb=20200623203119',
        }
        try {
            const { body } = await request
                .get(`https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${username}/${tag}`)

            const embed = new MessageEmbed()
                .setAuthor(`${username.charAt(0).toUpperCase() + username.slice(1)}#${tag} Last MMR`, `https://storage.qoo-static.com/game/17607/KGhkiIABcwb0ZdwWMfGGBsHCb6gQbQNX.jpg`)
                .addField('MMR', body.data.current_data.currenttierpatched, true)

                .setThumbnail(tier[body.data.current_data.currenttierpatched])

            message.channel.send(embed)

        } catch (err) {
            console.log(err)
        }
    }
}
