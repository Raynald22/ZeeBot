const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../config.js')


module.exports = {
    name: 'gfood',
    category: 'genshin',
    description: 'Show genshin list character',
    usage: `gfood`,

    run: async (client, message, args) => {

        if (!args[1]) {
            return message.channel.send(`Couldn't find any food.`);
        }

        const rarityEmot = {
            '1': ':star:',
            '2': ':star: :star:',
            '3': ':star: :star: :star:',
            '4': ':star: :star: :star: :star:',
            '5': ':star: :star: :star: :star: :star:',
        };

        try {
            const { body } = await request
                .get('https://api.genshin.dev/consumables/food/')

            const embed = new MessageEmbed()
                //show body capitalization
                .setTitle(`Foods List`)
                .addField(`${body['pile-em-up'].name}` + " " + "(" + rarityEmot[body['pile-em-up'].rarity] + ")", `${body['pile-em-up'].description}`)
                .addField(`${body['adeptus-temptation'].name}` + " " + "(" + rarityEmot[body['adeptus-temptation'].rarity] + ")", `${body['adeptus-temptation'].description}`)
                             
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();

            message.channel.send(embed);
        } catch (err) {
            return message.channel.send(`Something went wrong, please DM <@!325260673015873548>`);
        }
    }
}