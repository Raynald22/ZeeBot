const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')


module.exports = {
    name: 'genshin',
    category: 'genshin',
    description: 'Show genshin list character',
    usage: `genshin`,

    run: async (client, message, args) => {

        const logo = 'https://img.captain-droid.com/wp-content/uploads/com-mihoyo-genshinimpact-icon.png';

        try {
            const { body } = await request
                .get('https://api.genshin.dev/characters/')

            const embed = new MessageEmbed()
                //show body capitalization
                .setAuthor('Genshin Impact', logo)
                .setTitle(`Genshin List Character`)
                .addField(`__**Name**__`, body)
                .addField('**Source**', '[**Genshin Dev**](https://genshin.dev/)')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();

            message.channel.send(embed);
        } catch (err) {
            return message.channel.send(`Something went wrong, please DM <@!325260673015873548>`);
        }
    }
}