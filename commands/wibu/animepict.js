const { MessageEmbed } = require("discord.js");
const malScraper = require('mal-scraper');
const config = require("../../config.js");
const func = require('../../functions/func')

module.exports = {
  name: 'animepict',
  category: 'wibu',
  aliases: [],
  description: 'Menampilkan gambar dari anime tersebut.',
  usage: `animepict <judul_anime>`,

  run: async(client, message, args) => {

      const search = `${args.join(" ")}`;
      malScraper.getPictures(args.join(" "))
        .then((data) => {
          //console.log(data)
        const malEmbed = new MessageEmbed()
          .setAuthor('Anime Image', config.IconURL)
          .setTitle(`${func.capitalize(search)}`)
          .setColor(config.COLOR)
          .setImage(data[0].imageLink)
          .setFooter('Source: My Anime List (https://myanimelist.net/)')
          message.lineReply(malEmbed);

        }).catch((err) => message.lineReply(`Informasi untuk ${search} tidak ditemukan.`));
  }
};