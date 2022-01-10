const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const request = require('node-superfetch');
const axios = require('axios');

module.exports = {
    name: 'blur',
    category: 'image',
    aliases: [],
    description: 'Image converter (Blur).',
    usage: `Kirim gambar dengan comment \`blur\``,

    run: async (client, message, args) => {

        const image = message.attachments.size > 0 ? message.attachments.array()[0].url : null;

        const User = message.mentions.users.first();

        if (!image) {
          try {
            const noargs = new MessageEmbed()
            .setColor("2f3136")
            .setImage(`https://api.popcat.xyz/blur?image=${encodeURIComponent(User.displayAvatarURL({ format: 'png' }))}?size=4096`)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            return message.lineReply(noargs);
          } catch (err) {
            message.lineReply(`Format gambar tidak didukung.`)
          }
          
        }
        
        const embed = new MessageEmbed()
        .setColor(config.COLOR)
        .setImage(`https://api.popcat.xyz/blur?image=${encodeURIComponent(image)}?size=4096`)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        return message.lineReply(embed)

  }
}