const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const ms = require('parse-ms')

module.exports = {
    name: 'beg',
    category: 'economy',
    aliases: [''],
    description: 'Mengemis.',
    usage: `beg`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    let user = message.author;
    let timeout = 180000;
    const amount = func.getRandomInt(40, 140)
    let beg = await db.get(`beg_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
      let time = ms(timeout - (Date.now() - beg));
    
      message.lineReply(`Kamu sudah mengemis tadi, lakukan ulang setelah \`${time.minutes} menit ${time.seconds} detik.\``)
    } else {
      message.lineReply(`Berhasil mengemis dan mendapatkan \`Rp. ${func.formatRupiah(amount)}\``)
      db.add(`pocket_${user.id}`, amount)
      db.set(`beg_${user.id}`, Date.now())
    }

}}