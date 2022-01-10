const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const request = require('node-superfetch');
const func = require('../../functions/func.js')

module.exports = {
    name: 'read-qr',
    category: 'utility',
    aliases: ['qrread', 'qr-read'],
    description: 'Membaca apa yang ada di QR code.',
    usage: `read-qr`,
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
			const { body } = await request
				.get('https://api.qrserver.com/v1/read-qr-code/')
				.query({ fileurl: image });
			const data = body[0].symbol[0];
			if (!data.data) return message.lineReply(`Tidak bisa membaca qr: ${data.error}.`);
			return message.lineReply(func.shorten(data.data, 2000 - (message.author.toString().length + 2)));
		} catch (err) {
			return message.lineReply(`Error ${err.message}.`);
		}

  }
}