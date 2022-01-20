const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')


module.exports = {
    name: 'gcharacter',
    category: 'genshin',
    description: 'Show genshin character',
    usage: `gcharacter <character>`,
    aliases: ['gc', 'gchar'],

    run: async (client, message, args) => {
        const character = args[0];
        if (!character) return message.channel.send('Please provide a character');

        // character capitalization
        const char = character.charAt(0).toUpperCase() + character.slice(1);
        const thumbnail = 'https://rerollcdn.com/GENSHIN/Characters/' + character.charAt(0).toUpperCase() + character.slice(1) + '.png';
        image = 'https://api.genshin.dev/characters/' + character + '/portrait';
        const logo = 'https://img.captain-droid.com/wp-content/uploads/com-mihoyo-genshinimpact-icon.png';
        //show rarity with :star:
        const rarity = {
            '1': ':star:',
            '2': ':star: :star:',
            '3': ':star: :star: :star:',
            '4': ':star: :star: :star: :star:',
            '5': ':star: :star: :star: :star: :star:'
        };

        const vision = {
            'Pyro': ':fire: Pyro',
            'Hydro': '💧 Hydro',
            'Electro': ':zap: Electro',
            'Cryo': ':snowflake: Cryo',
            'Dendro': '🍃 Dendro',
            'Anemo': ':wind_blowing_face: Anemo',
            'Geo': '<:geo:931434806183616554> (Geo)'
        };

        try {
            const { body } = await request
                .get('https://api.genshin.dev/characters/' + character)

            if (body.skillTalents[2].description.length >= 1000)
                return message.channel.send("Too long description, cant show it right now");

            const embed = new MessageEmbed()
                .setAuthor('Genshin Character', logo)
                .setTitle(body.name)
                .setURL(body.url)
                .setDescription(body.description)
                .addField('**Vision**', vision[body.vision], true)
                .addField('**Weapon**', body.weapon, true)
                .addField('**Rarity**', rarity[body.rarity], true)
                .addField('**Affiliation**', body.affiliation, true)
                .addField('**Nation**', body.nation, true)
                .addField('**Birthday**', body.birthday.split('-').reverse().join('/'), true)
                .addField(`**${body.skillTalents[0].unlock} : ${body.skillTalents[0].name}**`, body.skillTalents[0].description.replace("\n\n", "\n"))
                .addField(`**${body.skillTalents[1].unlock} : ${body.skillTalents[1].name}**`, body.skillTalents[1].description.replace("\n\n", "\n"))
                .addField(`**${body.skillTalents[2].unlock} : ${body.skillTalents[2].name}**`, body.skillTalents[2].description.replace("\n\n", "\n"))
                .addField(`**Passive Skill : ${body.passiveTalents[0].name} (${body.passiveTalents[0].unlock})**`, body.passiveTalents[0].description.replace("\n\n", "\n"), true)
                .addField(`**Passive Skill : ${body.passiveTalents[1].name} (${body.passiveTalents[1].unlock})**`, body.passiveTalents[1].description.replace("\n\n", "\n"), true)
                .addField(`**Passive Skill : ${body.passiveTalents[2].name} (${body.passiveTalents[2].unlock})**`, body.passiveTalents[2].description.replace("\n\n", "\n"), true)
                .addField(`**${body.constellations[0].unlock}** \n${body.constellations[0].name}`, body.constellations[0].description.replace("\n\n", "\n"), true)
                .addField(`**${body.constellations[1].unlock}** \n${body.constellations[1].name}`, body.constellations[1].description.replace("\n\n", "\n"), true)
                .addField(`**${body.constellations[2].unlock}** \n${body.constellations[2].name}`, body.constellations[2].description.replace("\n\n", "\n"), true)
                .addField(`**${body.constellations[3].unlock}** \n${body.constellations[3].name}`, body.constellations[3].description.replace("\n\n", "\n"), true)
                .addField(`**${body.constellations[4].unlock}** \n${body.constellations[4].name}`, body.constellations[4].description.replace("\n\n", "\n"), true)
                .addField(`**${body.constellations[5].unlock}** \n${body.constellations[5].name}`, body.constellations[5].description.replace("\n\n", "\n"), true)
                .setThumbnail(thumbnail)
                .setImage(image)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();

            message.channel.send(embed);
        } catch (err) {
            return message.channel.send(`Could not find character ${character}`);
        }
    }
}