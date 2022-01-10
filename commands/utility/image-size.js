const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const request = require('node-superfetch');
const { loadImage } = require('canvas');
const func = require('../../functions/func.js')

module.exports = {
    name: 'image-size',
    category: 'utility',
    aliases: ['size', 'imgsize'],
    description: 'Menampilkan ukuran pada gambar.',
    usage: `image-size`,
    run: async (client, message, args) => {

      const image = message.attachments.size > 0 ? message.attachments.array()[0].url : null;

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

    try {
			const { body } = await request.get(image);
			const data = await loadImage(body);
			return message.lineReply(`\`${data.width}x${data.height}.\``);
		} catch (err) {
			return message.lineReply(`Error ${err.message}.`);
		}

  }
}