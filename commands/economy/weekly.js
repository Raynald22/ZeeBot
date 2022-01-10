const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const ms = require('parse-ms')

module.exports = {
    name: 'weekly',
    category: 'economy',
    aliases: ['sw'],
    description: 'Ambil saldo mingguan.',
    usage: `weekly`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    let user = message.author;
    let timeout = 604800000;
    const amount = func.getRandomInt(600, 1000)

    let weekly = await db.get(`weekly_${user.id}`);

    if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
      let time = ms(timeout - (Date.now() - weekly));
    
      message.lineReply(`Kamu sudah mengambil saldo mingguan, lakukan kembali setelah \`${time.days} hari ${time.hours} jam ${time.minutes} menit, ${time.seconds} detik\``)
    } else {
      message.lineReply(`Kamu berhasil mengambil saldo mingguan sebesar \`Rp. ${func.formatRupiah(amount)}\``)
      db.add(`pocket_${user.id}`, amount)
      db.set(`weekly_${user.id}`, Date.now())
    }

}}