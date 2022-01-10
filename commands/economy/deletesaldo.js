const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')

module.exports = {
    name: 'deletesaldo',
    category: 'economy',
    aliases: ['kurangisaldo', 'delsaldo'],
    description: 'Mengurangi saldo pengguna.',
    usage: `deletesaldo <mention_pengguna> <nilai_saldo>`,
    yangbisapakai: 'Admin Bot',
    run: async (client, message, args) => {

        if (message.author.id !== "325260673015873548" && message.author.id !== "423453260289015808") return message.lineReply("Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .");

        let user = message.mentions.members.first();

        if (!user) return message.lineReply(`Mention orangnya yang ingin kamu kurangi saldonya.`)

        if (isNaN(args[1])) return message.lineReply(`Masukkan nilai saldo yang ingin kamu kurangi.`)

        if (args[0] >= 100000) return message.lineReply(`Saldo tidak boleh melebihi \`Rp. 100.000\`.`)

        db.subtract(`pocket_${user.id}`, args[1])

        let balance = await db.get(`pocket_${user.id}`)

        message.lineReply(`Berhasil mengurangi saldonya ${user} sebesar \`Rp. ${func.formatRupiah(args[1])}\``)

    }
}