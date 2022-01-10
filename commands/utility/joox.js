const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const axios = require('axios');

module.exports = {
  name: 'joox',
  category: 'utility',
  aliases: [],
  description: 'Menampilkan informasi lagu (Joox).',
  usage: `joox`,
  run: async (client, message, args) => {

    const datanya = await axios(
      `https://mnazria.herokuapp.com/api/jooxnich?search=${args.join(" ")}`)
      .then((res) => res.data)
      .catch((err) => {
        message.lineReply("Ada kesalahan <@!325260673015873548>")
      });

    try {
      const embed = new MessageEmbed()
        //.setTitle("")
        .setAuthor('Joox (Informasi Musik)', 'https://media.discordapp.net/attachments/878533810550079528/905286784517283860/joox.png?width=208&height=201')
        .setImage(datanya.result.imgSrc)
        .setThumbnail(datanya.result.msingermid)
        .setColor(config.COLOR)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Judul lagu**: ${datanya.result.msong}\n**ID**: ${datanya.result.ktrack_id}\n**Penyanyi**: ${datanya.result.msinger}\n**ID Penyanyi**: ${datanya.result.msingerid}\n**Dirilis pada**: ${datanya.result.public_time}\n**Album**: ${datanya.result.malbum}\n**ID Album**: ${datanya.result.malbumid}\n\n**Dengarkan disini**:\n[Mp3](${datanya.result.mp3Url}) - [M4a](${datanya.result.m4aUrl})`)
      message.lineReply(embed);
    } catch (err) {
      message.lineReply(`Tidak dapat menampilkan data dari lagu tersebut.`)
    }

  }
}