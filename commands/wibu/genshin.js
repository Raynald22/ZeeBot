const { MessageEmbed } = require("discord.js");

const malScraper = require('mal-scraper');
const config = require("../../config.js");

module.export = {
    name: 'genshin',
    description: 'Cari data tentang genshin',
    category: 'wibu',
    usage: 'genshin <nama character>',


    // get data genshin from https://api.genshin.dev
    run: async (client, message, args) => {

        const search = `${args.join(" ")}`;
        if (!search) return message.channel.send("Masukkan nama character!");

        malScraper.getInfoFromName(args.join(" "))
            .then(async (data) => {
                const malEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription(`**${data.name}**`)
                    .setThumbnail(data.image)

                message.channel.send(malEmbed);
            }).catch(err => {
                message.channel.send("Character tidak ditemukan!");
            });
    }
}
