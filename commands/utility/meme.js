const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const config = require('../../config.js')
const axios = require('axios');

module.exports = {
  name: 'meme',
  category: 'utility',
  aliases: [],
  description: 'Menampilkan meme sesuai genre.',
  usage: `meme`,
  run: async (client, message, args) => {

    const guildDB = await Guild.findOne({
      guildID: message.guild.id
    });

    const genrenya = args.join(" ")

    const datanya = await axios(
      `https://mnazria.herokuapp.com/api/meme-search?genre=${genrenya}`)
      .then((res) => res.data)
      .catch((err) => {
        message.lineReply("Ada kesalahan <@!325260673015873548>")
      });

    if (!genrenya) return message.lineReply(`Masukkan genre-nya.\nContoh: ${guildDB.prefix}meme <genre>\n\nGenre yang tersedia: \`Dankmemes, Wholesomeanimemes, Wholesomememes4, AdviceAnimals, MemeEconomy, Terriblefacebookmemes, Teenagers, Historymemes, Okbuddyretard, Nukedmemes\``)

    if (message.author.id === '325260673015873548') {
      const embed = new MessageEmbed()
        .setTitle(`${datanya.title}`)
        .setImage(datanya.url)
        .setColor(config.COLOR)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Genre**: ${datanya.subreddit}\n**NSFW**: ${datanya.nsfw ? 'Ya' : 'Tidak'}\n**Spoiler**: ${datanya.spoiler ? 'Ya' : 'Tidak'}`);
      message.lineReply(embed);
      message.delete({ timeout: 500 })
    } else {
      const embed = new MessageEmbed()
        .setTitle(`${datanya.title}`)
        .setImage(datanya.url)
        .setColor(config.COLOR)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Genre**: ${datanya.subreddit}\n**NSFW**: ${datanya.nsfw ? 'Ya' : 'Tidak'}\n**Spoiler**: ${datanya.spoiler ? 'Ya' : 'Tidak'}`);
      message.lineReply(embed);
    }

  }
}