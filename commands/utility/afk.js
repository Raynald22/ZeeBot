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

    // reply message with reason
    if (args.length > 0) {
      data.reason = args.join(' ')
      data.save()
      //delete message after 2 seconds
      setTimeout(() => {
        message.delete()
      }, 2000)
      return message.channel.send(`${message.author} sekarang afk karena ${data.reason}`)

    } else {
      data.reason = 'No reason provided'
      data.save()
      message.reply(`lu afk karena **gaada**`)
    }

    data.AFK = true
    data.AFK_Reason = args.join(" ")
    await data.save()

    message.member.setNickname(message.member.user.username + " [AFK]");

  }
}