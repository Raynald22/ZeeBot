const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const moment = require("moment")

module.exports = {
  name: 'emojiinfo',
  category: 'utility',
  aliases: ['emoji'],
  description: 'Menampilkan info Emoji.',
  usage: `emojiinfo <emoji>`,
  run: async (client, message, args) => {

    try {
      let hasEmoteRegex = /<a?:.+:\d+>/gm
      let emoteRegex = /<:.+:(\d+)>/gm
      let animatedEmoteRegex = /<a:.+:(\d+)>/gm

      if (!message.content.match(hasEmoteRegex))
        return message.reply("<:no:833101993668771842> Your message does not include a VALID Emoji, please retry by adding a guild specific emoji!")

      if (emoji1 = emoteRegex.exec(message)) {
        let url = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".png?v=1"
        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emoji1[1] || emj.id == emoji1[1])
        if (!emoji) return message.lineReply("Please provide a custom Emoji from **THIS GUILD**")

        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? "✅" : "❌";
        const embed = new MessageEmbed()
          .setTitle(`**${emoji.name.toLowerCase()}**`)
          .setColor(config.COLOR)
          .setThumbnail(emoji.url)
          .addField("**General:**", [
            `**ID:** \`${emoji.id}\``,
            `**URL:** [\`LINK\`](${emoji.url})`,
            `**AUTHOR:** ${authorFetch} (\`${authorFetch.id}\`)`,
            `**CREATED AT:** \`${moment(emoji.createdTimestamp).format("DD/MM/YYYY") + " | " + moment(emoji.createdTimestamp).format("hh:mm:ss")}\``
          ])
          .addField("**Others:**", [
            `**Requires Colons:** \`${checkOrCross(emoji.requireColons)}\``,
            `**Animated:** \`${checkOrCross(emoji.animated)}\``,
            `**Deleteable:** \`${checkOrCross(emoji.deleteable)}\``,
            `**Managed:** \`${checkOrCross(emoji.managed)}\``,
          ]).setFooter(message.author.tag, message.author.displayAvatarURL)
        message.lineReply(embed)
      }
      else if (emoji1 = animatedEmoteRegex.exec(message)) {
        let url2 = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".gif?v=1"
        let attachment2 = new Discord.MessageAttachment(url2, "emoji.gif")
        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emoji1[1] || emj.id == emoji1[1])
        if (!emoji) return message.lineReply("Please provide a custom Emoji from **THIS GUILD**")

        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? "✅" : "❌";
        const embed = new MessageEmbed()
          .setTitle(`**Emoji Information for: __\`${emoji.name.toLowerCase()}\`__**`)
          .setColor("#2f3136")
          .setThumbnail(emoji.url)
          .addField("**General:**", [
            `**ID:** \`${emoji.id}\``,
            `**URL:** [\`LINK\`](${emoji.url})`,
            `**AUTHOR:** ${authorFetch} (\`${authorFetch.id}\`)`,
            `**CREATED AT:** \`${moment(emoji.createdTimestamp).format("DD/MM/YYYY") + " | " + moment(emoji.createdTimestamp).format("hh:mm:ss")}\``
          ])
          .addField("**Others:**", [
            `**Requires Colons:** \`${checkOrCross(emoji.requireColons)}\``,
            `**Animated:** \`${checkOrCross(emoji.animated)}\``,
            `**Deleteable:** \`${checkOrCross(emoji.deleteable)}\``,
            `**Managed:** \`${checkOrCross(emoji.managed)}\``,
          ]).setFooter(message.author.tag, message.author.displayAvatarURL)
        message.lineReply(embed)
      }
      else {
        message.lineReply("Info untuk emoji tersebut tidak dapat ditemukan.")
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.lineReply(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTitle(`Ada kesalahan <@!325260673015873548>`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }

  }
}