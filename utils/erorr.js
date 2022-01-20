const { MessageEmbed } = require("discord.js")

module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setDescription(text)
    await channel.send(embed)

    return embed
}