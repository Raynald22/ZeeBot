const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: 'genshincharacter',
    category: 'genshin',
    description: 'Show genshin character',
    usage: `genshin <character>`,
    aliases: ['genshinchar'],

    run: async (client, message, args) => {
        const character = args[0];
        if (!character) return message.channel.send('Please provide a character');

        // character capitalization
        const char = character.charAt(0).toUpperCase() + character.slice(1);
        const thumbnail = 'https://rerollcdn.com/GENSHIN/Characters/' + character.charAt(0).toUpperCase() + character.slice(1) + '.png';

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
        };

        try {
            const { body } = await request
                .get('https://api.genshin.dev/characters/' + character)

            if (body.skillTalents[2].description.length >= 1000)
                return message.channel.send("Too long description, cant show it right now");

            const embed = new MessageEmbed()
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
                .setThumbnail(thumbnail)
                .addField('**Source**', '[**Genshin Dev**](https://genshin.dev/)')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();

            message.channel.send(embed);
        } catch (err) {
            return message.channel.send(`Could not find character ${character}`);
        }
    }
}