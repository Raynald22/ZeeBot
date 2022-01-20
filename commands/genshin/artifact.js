const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')

module.exports = {
    name: 'gartifact',
    description: 'Searches for an artifact.',
    usage: 'gartifact <name>',
    category: 'genshin',
    run: async (client, message, args) => {
        
        //replace spaces with -  and capitalize first letter
        let artifact = args.join(' ').replace(/\s/g, '-').toUpperCase();

        if (!args[0]) {
            return message.channel.send(`${message.author}, you need to specify an artifact to search for.`);
        }

        const rarity = {
            '1': ':star:',
            '2': ':star: :star:',
            '3': ':star: :star: :star:',
            '4': ':star: :star: :star: :star:',
            '5': ':star: :star: :star: :star: :star:'
        };

        
        ///replace spaces with -  and lowercase everything
        const thumbnail = 'https://rerollcdn.com/GENSHIN/Gear/' + artifact.replace(/\s/g, '_').toUpperCase() + '.png';
        const logo = 'https://img.captain-droid.com/wp-content/uploads/com-mihoyo-genshinimpact-icon.png';

        try {
            const { body } = await request
                .get('https://api.genshin.dev/artifacts/' + artifact)

            const embed = new MessageEmbed()
                .setAuthor('Genshin Artifact', logo)
                .setTitle(`${body.name}`)
                .addField(`**Max Rarity**`, rarity[body.max_rarity], true)
                .addField(`2 Piece Bonus`, `${body['2-piece_bonus']}`)
                .addField(`4 Piece Bonus`, `${body['4-piece_bonus']}`)
                .setThumbnail(thumbnail)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
            message.channel.send(embed);

        } catch (err) {
            //capitalize first letter of each word

            return message.channel.send(artifact.replace(/-/g, ' ').charAt(0).toUpperCase() + enemy.slice(1) + " " + 'Not Found');
        }
    }
}