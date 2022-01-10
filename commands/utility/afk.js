const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const schema = require('../../models/afk-schema')

module.exports = {
    name: 'afk',
    category: 'utility',
    aliases: [],
    description: 'Away from keyboard',
    usage: `afk [reason]`,
    run: async (client, message, args) => {

    let data;
    try {
      data = await schema.findOne({
        userId: message.author.id,
        guildId: message.guild.id,
      })
      if (!data) {
        data = await schema.create({
          userId: message.author.id,
          guildId: message.guild.id,
        })
      }
    } catch (e) {
      console.log(e)
    }

    message.lineReply(`Beralih ke mode afk...`)
    data.AFK = true
    data.AFK_Reason = args.join(" ")
    await data.save()

    message.member.setNickname(message.member.user.username + " [AFK]");

  }
}