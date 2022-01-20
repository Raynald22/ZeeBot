const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')

module.exports = {
    name: 'gelement',
    description: 'Show element information',
    usage: `gelement <name>`,
    category: 'genshin',
    run: async (client, message, args) => {

        const element = args[0];
        const thumbnail = 'https://api.genshin.dev/elements/' + element + '/icon';


        if (!element) return message.channel.send('Please provide an element.');

        const logo = 'https://img.captain-droid.com/wp-content/uploads/com-mihoyo-genshinimpact-icon.png';


        try {
            const { body } = await request
                .get('https://api.genshin.dev/elements/' + element)

            const embed = new MessageEmbed()
            .setAuthor('Genshin Element', logo)
            .setTitle(body.name)
            // add field with json [reactions : [{name, url}]]
            .addField(`Reaction`, `**${body.reactions[0].name}** with ${body.reactions[0].elements}\n ${body.reactions[0].description}`)            
            .setThumbnail(thumbnail)
            .setFooter('Requested by ' + message.author.username, message.author.avatarURL())
            .setTimestamp()
            message.channel.send(embed);
        } catch (err) {
            return message.channel.send('Element not found.');
        }
    }
}