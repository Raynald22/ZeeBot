const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')

module.exports = {
    name: 'sell',
    category: 'economy',
    aliases: [''],
    description: 'Menjual role yang dimiliki.',
    usage: `sell <nomor_urutan_role>`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    const saldo = await db.get(`pocket_${message.author.id}`)

    if (args[0] === '1') {
      try {
        let role = message.guild.roles.cache.find(r => r.id === "878514296299085834");
        if (!message.member.roles.cache.has('878514296299085834')) return message.lineReply(`Kamu tidak mempunyai role \`${role.name}\` untuk dijual.`)
        message.lineReply(`Berhasil menjual role \`${role.name}\` seharga \`Rp. 1.000.000.000\`.`)
        message.guild.members.cache.get(message.author.id).roles.remove(role);
        db.add(`pocket_${message.author.id}`, 1000000000)
      } catch (err) {
        message.lineReply(err)
      }
    } else if (args[0] === '2') {
        try {
          let role = message.guild.roles.cache.find(r => r.id === "884997389793001553");
          if (!message.member.roles.cache.has('884997389793001553')) return message.lineReply(`Kamu tidak mempunyai role \`${role.name}\` untuk dijual.`)
          message.lineReply(`Berhasil menjual role \`${role.name}\` seharga \`Rp. 2.000.000\`.`)
          message.guild.members.cache.get(message.author.id).roles.remove(role);
          db.add(`pocket_${message.author.id}`, 2000000)
        } catch (err) {
          message.lineReply(err)
        }
    } else {
        message.lineReply('Input tidak ditemukan.')
    }

}}