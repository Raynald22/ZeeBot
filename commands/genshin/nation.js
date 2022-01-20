const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')


module.exports = {
    name: 'gnation',
    category: 'genshin',
    description: 'Get information about a nation.',
    usage: 'gnation [name]',
    run: async (client, message, args) => {

        const nation = args[0];

        if (!nation) return message.channel.send('Please provide a nation name.');

        const image = {
            'Inazuma': 'https://wallpapercave.com/wp/wp9550688.jpg',
            'Liyue': 'https://wallpapercave.com/wp/wp9498565.png',
            'Mondstadt': 'https://images5.alphacoders.com/109/thumb-1920-1099191.jpg',
        }
        const logo = 'https://img.captain-droid.com/wp-content/uploads/com-mihoyo-genshinimpact-icon.png';


        try {
            const { body } = await request
                .get('https://api.genshin.dev/nations/' + nation);

            const embed = new MessageEmbed()
                .setAuthor('Genshin Nation', logo)
                .setTitle(body.name)
                .addField('Element', body.element, true)
                .addField('Archon', body.archon, true)
                .addField('Entity', body.controllingEntity, true)
                .setImage(image[body.name])
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();

            message.channel.send(embed);
        } catch (err) {
            return message.channel.send('Could not find that nation.');
        }
    }
}

