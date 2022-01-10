const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const func = require('../../functions/func');
const Guild = require('../../models/guild');
const config = require('../../config')

module.exports = {
      name: 'kbbi',
      category: 'utility',
      aliases: [],
      description: 'Menampilkan informasi Kata dari Kamus Besar Bahasa Indonesia.',
      usage: `kbbi`,
      run: async (client, message, args) => {

            const guildDB = await Guild.findOne({
                  guildID: message.guild.id
            });

            const dataa = await fetch(`https://new-kbbi-api.herokuapp.com/cari/${args[0]}`)
            const parsed = await dataa.json()
            if (parsed.status === "false") return message.lineReply(`\`${args[0]}\` tidak ditemukan.`)

            const embed = new MessageEmbed()
                  .setColor(config.COLOR)
                  .setTitle(parsed.data[0].lema)
                  .setDescription(`**Kelas kata**: ${parsed.data[0].arti[0].kelas_kata}\n**Deskripsi**: ${parsed.data[0].arti[0].deskripsi}`)
                  .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL())
                  .setTimestamp()
            return message.lineReply(embed);

      }
};