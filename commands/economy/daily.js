const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const ms = require('parse-ms')

module.exports = {
    name: 'daily',
    category: 'economy',
    aliases: ['sd'],
    description: 'Ambil saldo harian.',
    usage: `daily`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    let user = message.author;
    let timeout = 86400000;
    const amount = func.getRandomInt(30, 150)

    let daily = await db.get(`daily_${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));
    
      message.lineReply(`Kamu sudah mengambil saldo harian, lakukan kembali setelah \`${time.hours} jam ${time.minutes} menit, ${time.seconds} detik\``)
    } else {
      message.lineReply(`Kamu berhasil mengambil saldo harian sebesar \`Rp. ${func.formatRupiah(amount)}\``)
      db.add(`pocket_${user.id}`, amount)
      db.set(`daily_${user.id}`, Date.now())
    }

}}