const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const func = require('../../functions/func.js')

module.exports = {
    name: 'charcount',
    category: 'utility',
    aliases: ['co'],
    description: 'Menghitung jumlah karakter.',
    usage: `charcount [teks]`,
    run: async (client, message, args) => {

      return message.lineReply(`\`${func.formatNumber(args.join(" ").length)}\``)

  }
}