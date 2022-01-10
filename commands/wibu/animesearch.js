const { MessageEmbed } = require("discord.js");
const malScraper = require('mal-scraper');
const config = require("../../config.js");
function capitalize(word) {
    return word
    .toLowerCase()
    .replace(/\w/, firstLetter => firstLetter.toUpperCase());
}

module.exports = {
  name: 'animesearch',
  category: 'wibu',
  aliases: ['anime'],
  description: 'Menampilkan informasi anime.',
  usage: `animesearch <judul_anime>`,

  run: async(client, message, args) => {

      const search = `${args.join(" ")}`;
      malScraper.getInfoFromName(args.join(" "))
        .then((data) => {
        const malEmbed = new MessageEmbed()
          .setAuthor('Anime information', config.IconURL)
          .setThumbnail(data.picture)
          .setColor("2f3136")
          .setDescription(`**English Title**: ${data.englishTitle}\n**Japanese Title**: ${data.japaneseTitle}\n**Synopsis**: ${data.synopsis.substring(0, 500)} [Baca lebih lanjut](${data.url})\n**Type**: ${data.type}\n**Episodes**: ${data.episodes}\n**Rating**: ${data.rating}\n**Aired**: ${data.aired}\n**Score**: ${data.score}\n**Score Stats**: ${data.scoreStats}\n\n**[Visit Page](${data.url})**`)
          .setFooter('Source: My Anime List (https://myanimelist.net/)')
          message.lineReply(malEmbed);

        }).catch((err) => message.lineReply(`Informasi untuk ${search} tidak ditemukan.`));
  }
};