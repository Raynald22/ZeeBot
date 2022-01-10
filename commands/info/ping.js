const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')

module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `ping`,
    run: async (client, message, args) => {
        const msg = await message.channel.send('Ping botnya segini...');

        const embed = new MessageEmbed()
            .setColor(config.COLOR)
            //.setTitle('Getting Latency...')
            .setDescription(`Ping: **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI Latency: **${Math.round(client.ws.ping)} ms**`);

        message.channel.send(embed);
    }
}