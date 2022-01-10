const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')

module.exports = {
    name: 'leaderboard',
    category: 'economy',
    aliases: ['baltop', 'topsaldo', 'lb'],
    description: 'Cek Balance Top.',
    usage: `baltop`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

        let saldo = db.all().filter(data => data.ID.startsWith(`pocket_`)).sort((a, b) => b.data - a.data);

        if (!saldo.length) {
            let noEmbed = new MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setColor(config.COLOR)
                .setFooter("Tidak ada satupun.")
            return message.lineReply(noEmbed)
        };

        saldo.length = 10;
        var finalLb = "";
        for (var i in saldo) {
            if (saldo[i].data === null) saldo[i].data = 0
            //const bank = await db.get(`bank_${client.users.cache.get(saldo[i].ID.split('_')[1])}`)
            finalLb += `**${saldo.indexOf(saldo[i]) + 1}. ${client.users.cache.get(saldo[i].ID.split('_')[1]) ? client.users.cache.get(saldo[i].ID.split('_')[1]).tag : "Pengguna tidak diketahui"}** - \`Rp. ${func.formatRupiah(saldo[i].data)}\`\n`;
        };

        const embed = new MessageEmbed()
            .setTitle(`Papan peringkat saldo`)
            .setColor(config.COLOR)
            .setDescription(finalLb)
            //.setFooter(client.user.tag, client.user.displayAvatarURL())
            .setTimestamp()
        message.lineReply(embed);
    }
};