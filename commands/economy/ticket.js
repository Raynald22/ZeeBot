const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const config = require('../../config.js')
const db = require('quick.db');
const ms = require('parse-ms')

module.exports = {
    name: 'ticket',
    category: 'economy',
    aliases: [],
    description: 'Menampilkan apa saja menu-menu Ticket.',
    usage: `ticket`,
    run: async (client, message, args) => {

      const guildDB = await Guild.findOne({
            guildID: message.guild.id
      })

      let timeout = 86400000;
      let ticketnya = db.get(`ticket_${message.author.id}`)
      let ticketdaily = await db.get(`ticketdaily_${message.author.id}`)
      let ticketnya2 = ticketnya + 7
      let user = message.mentions.members.first();

      if (args[0] === 'inventory' || args[0] === 'i' || args[0] === 'inv') {
        const embed = new MessageEmbed()
        .setTitle(`Ticket Game`)
        .setDescription(`Ticket yang dimiliki oleh ${message.author.tag} adalah sebanyak \`${ticketnya ? ticketnya : '0'}\` :ticket:`)
        .setColor(config.COLOR)
        message.lineReply(embed)
      } else if (args[0] === 'info') {
        const embed = new MessageEmbed()
        .setTitle('Ticket Game')
        .setDescription(`**Penjelasan**: Ticket Game ini adalah akses untuk menggunakan fitur games di KRM-MASTER.\n\n:grey_question: **Cara mendapatkannya**\nDengan mengirimkan \`${guildDB.prefix}ticket claim\` setiap 24 jam sekali dan mendapatkan \`7\` :ticket: .\nCara lain bisa beli menggunakan saldo di fitur economy dengan cara \`${guildDB.prefix}ticket shop\` (akan tetapi cara kedua ini masih dalam tahap perbaikan).\n\n:grey_exclamation: Ticket Game yang ada di inventory kamu tidak boleh melebihi \`10\` :ticket:, penyebabnya adalah keterbatasannya server pada game \`Tebak-tebakan, Tebak gambar, dan Kuis Cak lontong.\``)
        .setColor(config.COLOR)
        message.lineReply(embed)
      } else if (args[0] === 'claim' || args[0] === 'obtain') {

        if (ticketdaily !== null && timeout - (Date.now() - ticketdaily) > 0) {
          let time = ms(timeout - (Date.now() - ticketdaily));

          message.lineReply(`Kamu sudah mengambil ticket harian. lakukan kembali setelah \`${time.hours} jam ${time.minutes} menit, ${time.seconds} detik\``);
        } else {

          if (ticketnya2 > 10) return message.lineReply('Ticket yang ada di inventory tidak boleh melebihi \`10\` :ticket: .');

          db.add(`ticket_${message.author.id}`, 7)
          message.lineReply(`Berhasil mengambil ticket harian sebanyak \`7\` :ticket:`);
          db.set(`ticketdaily_${message.author.id}`, Date.now())
        }
      } else if (args[0] === 'add') {
        if (message.author.id != '325260673015873548') return message.lineReply('Kamu tidak mempunyai wewenang untuk menggunakan perintah ini.')

        let totalnya = args[2]
        db.add(`ticket_${user.id}`, totalnya)
        message.lineReply(`Berhasil menambahkan ticket ke ${user} sebanyak \`${totalnya}\` :ticket:`)
      } else if (args[0] === 'del') {
        if (message.author.id != '325260673015873548') return message.lineReply('Kamu tidak mempunyai wewenang untuk menggunakan perintah ini.')

        let totalnya = args[2]
        db.subtract(`ticket_${user.id}`, totalnya)
        message.lineReply(`Berhasil menghapus ticket dari ${user} sebanyak \`${totalnya}\` :ticket:`)
      } else if (args[0] === 'shop' || args[0] === 'toko') {
        message.lineReply(':grey_exclamation: Shop pada fitur ticket sedang dalam tahap perbaikan.')
      } else {
        message.lineReply(`**Menu tidak ditemukan**, berikut menu pada perintah ticket yang tersedia:\n\`${guildDB.prefix}ticket info\`\n\`${guildDB.prefix}ticket inventory\`\n\`${guildDB.prefix}ticket claim\`\n\`${guildDB.prefix}ticket add\` (hanya untuk admin bot)\n\`${guildDB.prefix}ticket del\` (hanya untuk admin bot)`)
      }
  }
}