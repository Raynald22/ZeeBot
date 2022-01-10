const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')

module.exports = {
    name: 'buy',
    category: 'economy',
    aliases: [''],
    description: 'Membeli role di toko.',
    usage: `buy <nomor_urutan_role>`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    const saldo = await db.get(`pocket_${message.author.id}`)

    if (args[0] === '1') {
      try {
        let role = message.guild.roles.cache.find(r => r.id === "878514296299085834");
        if (saldo < 1000000000) return message.lineReply(`Saldo kamu tidak mencukupi untuk membeli role \`${role.name}\`, dibutuhkan \`Rp. 1.000.000.000\` untuk membeli.`)
        if (message.member.roles.cache.has('878514296299085834')) return message.lineReply('Kamu sudah mempunyai role \`${role.name}\`.')
        message.lineReply(`Kamu berhasil membeli role \`${role.name}\``)
        message.guild.members.cache.get(message.author.id).roles.add(role);
        db.subtract(`pocket_${message.author.id}`, 1000000000)
      } catch (err) {
        message.lineReply(err)
      }
    } else if (args[0] === '2') {
        try {
          let role = message.guild.roles.cache.find(r => r.id === "884997389793001553");
          if (saldo < 2000000) return message.lineReply(`Saldo kamu tidak mencukupi untuk membeli role \`${role.name}\`, dibutuhkan \`Rp. 2.000.000\` untuk membeli.`)
          if (message.member.roles.cache.has('884997389793001553')) return message.lineReply(`Kamu sudah mempunyai role \`${role.name}\`.`)
          message.lineReply(`Kamu berhasil membeli role \`${role.name}\``)
          message.guild.members.cache.get(message.author.id).roles.add(role);
          db.subtract(`pocket_${message.author.id}`, 2000000)
        } catch (err) {
          message.lineReply(err)
        }
    } else {
        message.lineReply('Nomor tidak ditemukan.\nNomor yang valid hanya dari 1 - 13.')
    }

}}