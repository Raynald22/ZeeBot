const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')

module.exports = {
    name: 'balance',
    category: 'economy',
    aliases: ['bal', 'saldo'],
    description: 'Cek saldo.',
    usage: `balance [mention_pengguna]`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    let user = message.mentions.members.first() || client.users.cache.get(args[0]) || message.author;

    let pocket = db.get(`pocket_${user.id}`)
    if (pocket === "null") bal = 0;

    let bank = await db.get(`bank_${user.id}`)
    if (bank === "null") bank = 0;

    message.lineReply(`\`Rp. ${func.formatRupiah(pocket)}\` (Saldo bank: \`Rp. ${func.formatRupiah(bank)}\`)`)

}}