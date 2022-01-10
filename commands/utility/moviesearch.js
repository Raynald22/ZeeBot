const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const func = require('../../functions/func');
const Guild = require('../../models/guild');

module.exports = {
  name: 'moviesearch',
  category: 'utility',
  aliases: ['movie'],
  description: 'Menampilkan info tentang movie tertentu.',
  usage: `movie`,
  run: async (client, message, args) => {

    const guildDB = await Guild.findOne({
      guildID: message.guild.id
    });

    if (!args.length) {
      const noargs = new MessageEmbed()
        .setColor("2f3136")
        .setTitle('__Moviesearch__ (Utility)')
        .setDescription(`>>> Administrator: :white_check_mark:\nNon Administrator: :white_check_mark:\n\n**Usage**: ${guildDB.prefix}Moviesearch <song_title>`)
        .setFooter(`Command info`)
      return message.lineReply(noargs);
    }

    let query = args.join(" ").replace(`${guildDB.prefix}movie`, ``) || args.join(" ").replace(`${guildDB.prefix}moviesearch`, ``)
    let cond = query.split("/")
    let search = cond[0]
    let hadeh = `${args.join(" ")}`;
    const asw = await message.lineReply(`Searching for **${func.capitalize(args.join(" "))}**...`)
    try {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=957af83a0b61799686892b7d94ee072e&language=en-US&page=1&include_adult=false&query=${search}`)
      const parsed = await data.json()
      if (!parsed.results.length) return asw.edit(`**${func.capitalize(args.join(" "))}** Tidak ditemukan.`)
      const umm = parsed.results
      if (cond.length === 1) {
        let no = 0
        let result = `${func.capitalize(args.join(" "))}\n\n`
        for (let anu of umm) {
          no += 1
          result += `**${no}**. \`${anu.title}\`\n`
        }
        result += `\n>>> Usage:\n**${guildDB.prefix}Moviesearch** ${func.capitalize(args.join(" "))}/[num]\nEx: **${guildDB.prefix}Moviesearch** ${func.capitalize(args.join(" "))}/1`
        const embednya = new MessageEmbed()
          .setTitle('Movie Search')
          .setColor('2f3136')
          .setDescription(`${result}`)
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        asw.edit(embednya)
      } else if (cond.length === 2) {
        let num = parseInt(cond[1])
        if (num > (umm.length)) return asw.edit("Number not found!")
        if (num <= (umm.length)) {
          let searchs = umm[num - 1]
          let { title, overview, release_date, backdrop_path } = searchs
          let resp = `**Title**: ${title}\n**Overview**: ${overview}\n**Release date**: ${release_date}`
          const embednya = new MessageEmbed().setTitle('Movie Search').setColor('2f3136').setDescription(`${resp}`).setThumbnail(`https://image.tmdb.org/t/p/original/${backdrop_path}`)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
          asw.edit(embednya)
        }
      }
    } catch (err) {
      asw.edit('Ada kesalahan <@!325260673015873548>')
      console.log(err)
    }
  }
};