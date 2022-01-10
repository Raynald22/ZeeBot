const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const ms = require('parse-ms')

module.exports = {
    name: 'transfer',
    category: 'economy',
    aliases: ['tf'],
    description: 'Transfer saldo kantong.',
    usage: `transfer <mention_pengguna> <nilai_saldo>`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    let user = message.mentions.members.first() || client.users.cache.get(args[0]);

    let member = db.get(`pocket_${message.author.id}`)

    if (!user) return message.lineReply(`Mention pengguna untuk kamu transfer.`)
    if (!args[1]) return message.lineReply(`Masukkan nilai saldo untuk kamu transfer.`)
    if (isNaN(args[1])) return message.lineReply(`Masukkan nilai saldo untuk kamu transfer.`)
    if (message.content.includes('-')) return message.lineReply('Tidak dapat menggunakan simbol.')
    if (member < args[1]) return message.lineReply('Saldo kamu tidak mencukupi untuk melakukan transfer.')

    message.lineReply(`Kamu berhasil ngetransfer saldo sebesar \`Rp. ${func.formatRupiah(args[1])}\` ke ${user.user.username}.`)
    db.add(`pocket_${user.id}`, args[1])
    db.subtract(`pocket_${message.author.id}`, args[1])

}}