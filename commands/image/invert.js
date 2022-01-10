const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const axios = require('axios');

module.exports = {
    name: 'invert',
    category: 'image',
    aliases: [],
    description: 'Image converter (Invert).',
    usage: `Kirim gambar dengan comment \`invert\``,

    run: async (client, message, args) => {

        const image = message.attachments.size > 0 ? message.attachments.array()[0].url : null;

        const User = message.mentions.users.first();

        if (!image) {
          try {
            const noargs = new MessageEmbed()
            .setColor("2f3136")
            .setImage(`https://api.popcat.xyz/invert?image=${encodeURIComponent(User.displayAvatarURL({ format: 'png' }))}?size=4096`)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            return message.lineReply(noargs);
          } catch (err) {
            message.lineReply(`Format gambar tidak didukung.`)
          }
          
        }
        
        const embed = new MessageEmbed()
        .setColor(config.COLOR)
        .setImage(`https://api.popcat.xyz/invert?image=${encodeURIComponent(image)}?size=4096`)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        return message.lineReply(embed)

  }
}