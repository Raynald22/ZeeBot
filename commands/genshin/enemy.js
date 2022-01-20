const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')

module.exports = {
    name: 'genemy',
    description: 'Show enemy stats',
    category: 'genshin',
    usage: 'genemy <enemy>',

    run: async (client, message, args) => {
        //replace space with - and lowercase
        let enemy = args.join(' ').replace(/ /g, '-').toLowerCase();


        const thumbnail = 'https://api.genshin.dev/enemies/' + enemy + '/icon.png';
        const image = 'https://api.genshin.dev/enemies/' + enemy + '/portrait.png';


        if (!args[0]) {
            return message.channel.send(`${message.author}, please provide an enemy name.`);
        }

        const rarity = {
            '1': ':star:',
            '2': ':star: :star:',
            '3': ':star: :star: :star:',
            '4': ':star: :star: :star: :star:',
            '5': ':star: :star: :star: :star: :star:',
        };

        const logo = 'https://img.captain-droid.com/wp-content/uploads/com-mihoyo-genshinimpact-icon.png';

        

        try {
            const { body } = await request
                .get('https://api.genshin.dev/enemies/' + enemy)

            const embed = new MessageEmbed()
                .setAuthor('Genshin Enemy', logo)
                .setTitle(body.name)
                //if no data send N/A
                .setDescription(body.description || 'N/A')
                // .setDescription(body.description)
                .addField('Region', body.region, true)
                .addField('Type', body.type, true)

                .addField('Family', body.family, true)
                .addField('Drops', body.drops.length ? `${body.drops.map(drops => `${drops.name}` + '(' + rarity[drops.rarity] + ')' + `Minimum Level${drops['minimum-level']}` || `N/A`).join(`\n`)}` : 'No data', true)                
                // .addField('Elements', body.elements || body.element || 'N/A', true)
                .setThumbnail(thumbnail)
                .setImage(image)
                .setFooter('Requested by ' + message.author.tag, message.author.avatarURL())
                .setTimestamp()

            return message.channel.send(embed);
        } catch (err) {
            return message.channel.send(enemy.replace(/-/g, ' ').toLowerCase() + " "  + 'not found.');
        }
    }
}

