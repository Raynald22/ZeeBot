const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')

module.exports = {
    name: 'bet',
    category: 'economy',
    aliases: [''],
    description: 'Mengjudi.',
    usage: `bet`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {


      if(!args[0]) return message.lineReply('Harap masukkan saldo untuk di-bet.');

      if(!args[1]) return message.lineReply('Harap masukkan nilai tebakkan dari 1 sampai 50.');

      if(args[1] > 50) return message.lineReply('Nilai tebakkan tidak boleh lebih dari 50.');

      if(isNaN(args[0])) return message.lineReply('!bet <Jumlah Yang Mau Di bet> <Angka Yang Di Pilih>.');
      
      const amountToBet = parseInt(args[0]);
      let bal = db.get(`pocket_${message.author.id}`)

      if (bal === "null") bal = 0;

      if (bal < amountToBet) return message.lineReply('Saldo tidak mencukupi untuk melakukan bet.');

      const botrun = func.getRandomInt(45, 50)
      //const run = Math.floor(Math.random() * 50) + 2
      const run = args[1]

      const winAmount = amountToBet * 1;

      if(botrun <= run) {
        message.lineReply(`Koin bot: \`${botrun}\`\nKoin kamu: \`${run}\`\n\nYes, kamu memenangkan \`Rp. ${func.formatRupiah(winAmount)}\``)
        db.add(`pocket_${message.author.id}`, winAmount)
      } else {
        message.lineReply(`Koin bot: \`${botrun}\`\nKoin kamu: \`${run}\`\n\nYah, kamu kehilangan \`Rp. ${func.formatRupiah(amountToBet)}\``)
        db.subtract(`pocket_${message.author.id}`, amountToBet);
      }


}}