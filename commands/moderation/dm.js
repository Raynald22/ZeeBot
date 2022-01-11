// Sends a private message to the offender


module.exports = {
    name: 'dm',
    category: 'moderation',
    description: 'DM Pengguna',
    usage: `dm <mention_seseorang>`,
    aliases: ['whisper'],
    run: async (client, message, args) => {
        const { channel } = message.member;

        //if member not with id 325260673015873548
        if (message.author.id !== '325260673015873548') {
            return message.channel.send(`You dont have permission to use this command, please DM <@325260673015873548>`);
        }

        if (!message.mentions.users.first()) {
            message.delete({ timeout: 5000 });
            return message.reply('Kamu harus mengirimkan mention pada pengguna yang ingin dikirim pesan!');
        }
        if (!args[1]) {
            message.delete({ timeout: 2000 });
            // delete reply message after 2 seconds
            return message.reply('Kamu harus mengirimkan pesan yang ingin dikirim!');
        }

        const user = message.mentions.users.first();
        const dm = await user.createDM();
        dm.send(args.slice(1).join(' '));
        message.delete({ timeout: 2000 });
        message.channel.send(`Pesan telah dikirim ke ${user.username}!`).then(msg => msg.delete({ timeout: 2000 }));
    }
}