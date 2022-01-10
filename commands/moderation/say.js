const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')

module.exports = {
    name: 'say',
    category: 'moderation',
    description: 'Botnya ngomong apa yang lu ketik.',
    usage: `say`,
    run: (client, message, args) => {
        message.delete()

        if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '325260673015873548' || !message.author.id === '423453260289015808') return message.lineReply('Kamu tidak mempunyai wewenang atas perintah ini. Silahkan hubungi <@!423453260289015808> atau <@!325260673015873548> .').then(m => m.delete({ timeout: 5000 }));

        if (args.length < 1)
            return message.channel.send('ketik apa aja.').then(m => m.delete({ timeout: 5000 }));

        if (args[0].toLowerCase() === 'embed') {
            const embed = new MessageEmbed()
                .setColor(config.COLOR)
                .setDescription(args.slice(1).join(' '))

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(' '));
        }
    }
}