const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.js')

module.exports = {
    name: 'refresh',
    category: 'admin',
    aliases: ['rel', 'ref', 'reload'],
    description: 'Refresh the Command.',
    usage: `refresh <category> <command>`,
    run: async (client, message, args) => {

        if (message.author.id !== "325260673015873548" && message.author.id != "415466692064313344") {
            return message.channel.send("Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!415466692064313344> atau <@!325260673015873548> .");
        }

        if (!args[0]) return message.reply(`${config.PREFIX}refresh <category> <command>`)
        if (!args[1]) return message.reply(`\`${config.PREFIX}refresh <category> <command>\``)

        let category = args[0].toLowerCase()
        let command = args[1]

        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
            client.commands.delete(command);

            const pull = require(`../../commands/${category}/${command}.js`)
            client.commands.set(command, pull)

            return message.channel.send(`**\`${category}/${command}\`** berhasil direfresh.`)

        } catch (error) {
            return message.reply(`Gagal me-refresh **\`${command}\`**`)
        }

    }
}