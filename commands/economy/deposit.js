const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const ms = require('parse-ms')

module.exports = {
    name: 'deposit',
    category: 'economy',
    aliases: ['depo', 'dep'],
    description: 'Ngedeposit.',
    usage: `deposit <nilai_saldo>`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    let user = message.author;

    let member = db.get(`pocket_${user.id}`)
    let member2 = db.get(`bank_${user.id}`)
    
    if (args[0] == 'all' || args[0] == 'semua') {
      let pocket = await db.get(`pocket_${user.id}`)
      let bank = await db.get(`bank_${user.id}`)

      if(pocket === 0) return message.lineReply('Kamu tidak mempunyai satu rupiahpun di dompet.')

      db.add(`bank_${user.id}`, pocket)
      db.subtract(`pocket_${user.id}`, pocket)
      message.lineReply(`Berhasil ngedeposit semua saldo kantong ke saldo bank.`)
      
    } else {

      if (isNaN(args[0])) return message.lineReply('Masukkan nilai saldo yang ingin kamu deposit.')
      
      if (!args[0]) {
          return message.lineReply(`Masukkan nilai saldo yang ingin kamu deposit.`)
          .catch(err => console.log(err))
      }

      if (message.content.includes('-')) { 
          return message.lineReply(`Tidak dapat menggunakan simbol.`)
      }

      if (member < args[0]) {
          return message.lineReply(`Saldo kantong kamu tidak mencukupi untuk melakukan deposit.`)
      }

      message.lineReply(`Berhasil ngedeposit saldo kantong ke saldo bank sebesar \`Rp. ${func.formatRupiah(args[0])}\``)
      db.add(`bank_${user.id}`, args[0])
      db.subtract(`pocket_${user.id}`, args[0])
    }

}}