const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const ms = require('parse-ms')

module.exports = {
    name: 'monthly',
    category: 'economy',
    aliases: ['sm'],
    description: 'Ambil saldo bulanan.',
    usage: `monthly`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    let user = message.author;
    let timeout = 2592000000;
    const amount = func.getRandomInt(5000, 6000)

    let monthly = await db.get(`monthly_${user.id}`);

    if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
      let time = ms(timeout - (Date.now() - monthly));
    
      message.lineReply(`Kamu sudah mengambil saldo bulanan, lakukan kembali setelah \`${time.days} hari ${time.hours} jam ${time.minutes} menit, ${time.seconds} detik\``)
    } else {
      message.lineReply(`Kamu berhasil mengambil saldo bulanan sebesar \`Rp. ${func.formatRupiah(amount)}\``)
      db.add(`pocket_${user.id}`, amount)
      db.set(`monthly_${user.id}`, Date.now())
    }

}}