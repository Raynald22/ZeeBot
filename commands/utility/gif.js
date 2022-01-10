const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const func = require('../../functions/func');
const Guild = require('../../models/guild');

module.exports = {
  name: 'gif',
  category: 'utility',
  aliases: ['searchgif', 'gifsearch'],
  description: 'Menampilkan GIF yang diinginkan.',
  usage: `gif`,
  run: async (client, message, args) => {

    const guildDB = await Guild.findOne({
      guildID: message.guild.id
    });

    if (!args.length) {
      const noargs = new MessageEmbed()
        .setColor("2f3136")
        .setTitle('__GIF__ (Utility)')
        .setDescription(`>>> Administrator: :white_check_mark:\nNon Administrator: :white_check_mark:\n\n**Usage**: ${guildDB.prefix}Gif <query>`)
        .setFooter(`Command info`)
      return message.lineReply(noargs);
    }

    let query = args.join(" ").replace(`${guildDB.prefix}gif`, ``) || args.join(" ").replace(`${guildDB.prefix}Gif`, ``)
    let cond = query.split("/")
    let search = cond[0]
    let hadeh = `${args.join(" ")}`;
    const asw = await message.lineReply(`Searching for **${func.capitalize(args.join(" "))}**...`)
    try {
      const data = await fetch(`https://mnazria.herokuapp.com/api/gif?search=${search}`)
      const parsed = await data.json()
      if (!parsed.data.length) return asw.edit(`**${func.capitalize(args.join(" "))}** Tidak ditemukan.`)
      const umm = parsed.data
      if (cond.length === 1) {
        let no = 0
        let result = `${func.capitalize(args.join(" "))}\n\n`
        for (let anu of umm) {
          no += 1
          result += `**${no}**. \`${anu.title}\`\n`
        }
        result += `\n>>> Usage:\n**${guildDB.prefix}Gif** ${func.capitalize(args.join(" "))}/[num]\nEx: **${guildDB.prefix}Gif** ${func.capitalize(args.join(" "))}/1`
        const embednya = new MessageEmbed()
          .setTitle('GIF Search')
          .setColor('2f3136')
          .setDescription(`${result}`)
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        asw.edit(embednya)
      } else if (cond.length === 2) {
        let num = parseInt(cond[1])
        if (num > (umm.length)) return asw.edit("Number not found!")
        if (num <= (umm.length)) {
          let searchs = umm[num - 1]
          let { title, id, rating, username, images } = searchs
          let resp = `**ID**: ${id}\n**Rating**: ${rating}`
          const embednya = new MessageEmbed()
            .setAuthor('GIF Search')
            .setTitle(title)
            .setColor('2f3136')
            .setDescription(`${resp}`)
            .setImage(images.original.url)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
          asw.edit(embednya)
        }
      }
    } catch (err) {
      asw.edit('Ada kesalahan <@!325260673015873548>')
    }
  }
};