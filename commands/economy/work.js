const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const ms = require('parse-ms')

module.exports = {
    name: 'work',
    category: 'economy',
    aliases: [''],
    description: 'Bekerja.',
    usage: `work`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    let user = message.author;
    let author = await db.fetch(`work_${user.id}`)
    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        message.lineReply(`Kamu sedang bekerja saat ini, lakukan kembali setelah \`${time.minutes} menit ${time.seconds} detik.\``)
      } else {

        let replies = ['Titoker', 'Youtuber', 'Selebgram', 'Tukang bubur', 'Tukang mie ayam', 'Pelayan Wau']

        let result = Math.floor((Math.random() * replies.length));
        const amount = func.getRandomInt(50, 300)

        message.lineReply(`Kamu bekerja sebagai \`${replies[result]}\` dan mendapatkan saldo sebesar \`Rp. ${func.formatRupiah(amount)}\``)
        
        db.add(`pocket_${user.id}`, amount)
        db.set(`work_${user.id}`, Date.now())
    };

}}