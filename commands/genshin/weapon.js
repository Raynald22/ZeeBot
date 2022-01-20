const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')


module.exports = {
    name: 'gweapon',
    aliases: ['wep'],
    category: 'genshin',
    description: 'Gets weapon information from Genshin',
    usage: 'gweapon <weapon name>',
    run: async (client, message, args) => {

        //replace spaces with -
        let weapon = args.join('-').toLowerCase();

        if (!args[0]) {
            return message.channel.send(`${message.author}, please provide a weapon name.`);
        }
        const logo = 'https://img.captain-droid.com/wp-content/uploads/com-mihoyo-genshinimpact-icon.png';


        const rarity = {
            '1': ':star:',
            '2': ':star: :star:',
            '3': ':star: :star: :star:',
            '4': ':star: :star: :star: :star:',
            '5': ':star: :star: :star: :star: :star:'
        };

        //replace spaces with -
        const thumbnail = `https://api.genshin.dev/weapons/${weapon}/icon`;


        try {
            const { body } = await request.get('https://api.genshin.dev/weapons/' + weapon);

            const embed = new MessageEmbed()
                .setAuthor('Genshin Weapon', logo)
                .setTitle(body.name)
                .addField('Type', body.type, true)
                .addField('**Base ATK**', body.baseAttack, true)
                .addField('**Rarity**', rarity[body.rarity], true)
                .addField('**Substat**', body.subStat, true)
                .addField('**Where to get**', body.location, true)
                .addField(`**Passive: ${body.passiveName}**`, body.passiveDesc)
                .setThumbnail(thumbnail)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
            message.channel.send(embed);
        } catch (err) {
            return message.channel.send('Could not find weapon or replace space with -');
        }
    }
}
