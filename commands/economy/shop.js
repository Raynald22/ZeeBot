const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const ms = require('parse-ms')

module.exports = {
    name: 'shop',
    category: 'economy',
    aliases: [''],
    description: 'Toko role.',
    usage: `shop`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

      const settings = await Guild.findOne({
        guildID: message.guild.id
      })

      const embed = new MessageEmbed()
      .setTitle('Toko role Miawu')
      .setColor(config.COLOR)
      .setDescription(`\`1\`. <@&878514296299085834>: \`Rp. 1.000.000.000\` ${message.member.roles.cache.has('878514296299085834') ? ":white_check_mark:" : ":x:"}\n\`2\`. <@&884997389793001553>: \`Rp. 2.000.000\` ${message.member.roles.cache.has('884997389793001553') ? ":white_check_mark:" : ":x:"}`)
      .setFooter(`${settings.prefix}buy (nomor) / ${settings.prefix}sell (nomor)`)

      message.lineReply(embed)

}}