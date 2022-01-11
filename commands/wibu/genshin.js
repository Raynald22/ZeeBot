const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.export = {
    name: 'genshin',
    category: 'wibu',
    description: 'Cari data tentang genshin',
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
