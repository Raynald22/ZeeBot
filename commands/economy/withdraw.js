const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const ms = require('parse-ms')

module.exports = {
    name: 'withdraw',
    category: 'economy',
    aliases: ['wd', 'with'],
    description: 'Memindahkan saldo bank ke saldo kantong.',
    usage: `withdraw <nilai_saldo>`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

  let user = message.author;

  let member = db.get(`pocket_${user.id}`)
  let member2 = db.get(`bank_${user.id}`)

  if (args[0] == 'all' || args[0] == 'semua') {
    let money = await db.get(`bank_${user.id}`)
    
    db.subtract(`bank_${user.id}`, money)
    db.add(`pocket_${user.id}`, money)

    message.lineReply(`Kamu berhasil melakukan penarikan saldo (semua saldo).`)
  } else {

    if (!args[0]) return message.lineReply(`Masukkan nilai saldo untuk kamu tarik.`)
    if (message.content.includes('-')) return message.lineReply(`Tidak dapat menggunakan simbol.`)
    if (member2 < args[0]) return message.lineReply(`Gagal melakukan penarikan, nilai saldo tidak mencukupi.`)
    message.lineReply(`Kamu berhasil melakukan penarikan saldo sebesar \`Rp. ${func.formatRupiah(args[0])}\`.`)

    db.subtract(`bank_${user.id}`, args[0])
    db.add(`pocket_${user.id}`, args[0])
  }

}}