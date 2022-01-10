const currentGames = {};
const Discord = require("discord.js");
const axios = require('axios');
const func = require('../../functions/func')
const db = require('quick.db')
const Guild = require('../../models/guild');
const config = require('../../config')

module.exports = {
  name: 'tebakgambar',
  category: 'game',
  aliases: ['tg'],
  description: 'G.',
  usage: `tebakgambar`,

  run: async (client, message, args) => {

    const ticket = db.get(`ticket_${message.author.id}`)
    const saldo = db.get(`pocket_${message.author.id}`)
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    })

  	if (ticket < 1 || ticket === "null") {
  		return message.lineReply(`Ticket kamu tidak mencukupi, makadari itu tidak bisa menggunakan perintah ini.\nAmbil ticket harian untuk mendapatkan ticket, dengan cara \`${guildDB.prefix}ticket claim\``)
  	} else {

	    if (currentGames[message.guild.id]) return message.lineReply(`Ada soal yang belum diselesaikan.`);
	    	
	    	db.subtract(`ticket_${message.author.id}`, 1)

			const datanya = await axios(
	        `https://api.zeks.me/api/tebakgambar?apikey=Reighpuy1805`)
	        	.then((res) => res.data)
	        	.catch((err) => {
	        		message.lineReply("Ada kesalahan <@!325260673015873548>")
	        	}
	        );

	        if (!datanya.status === true) return message.lineReply(`Status server game nya sedang tidak kondusif, coba lagi lain waktu.`)

	        // client.channels.cache.get("901502995525693551").send(datanya.result.jawaban)

          client.users.cache.get("325260673015873548").send(datanya.result.jawaban)

			const participants = [];
			const totalhadiah = func.getRandomInt(700, 1000);

      const embed = new Discord.MessageEmbed()
      .setTitle('Tebak Gambar')
      .setDescription(`**Tingkat kesulitan**: ${datanya.result.tingkat}\n**Waktu menebak**: 1 menit (60 detik)`)
      .setColor(config.COLOR)
      .setImage(datanya.result.soal)

      await message.lineReply(embed);

			const gameCreatedAt = Date.now();

			const collector = new Discord.MessageCollector(
				message.channel,
				m => !m.author.bot,
				{
					time: 60000
				}
			);
			currentGames[message.guild.id] = true;

			collector.on("collect", async msg => {
				if (!participants.includes(msg.author.id)) {
					participants.push(msg.author.id);
				}


				const jawabnya = msg.content.toLowerCase();
	  
				if (jawabnya === datanya.result.jawaban.toLowerCase()) {

					message.channel.send(`Selamat, **${message.author.username}** telah menebak soal dengan benar.\nMendapatkan saldo sebesar: \`Rp. ${func.formatRupiah(totalhadiah)}\`\n\n**Jumlah Pemain**: ${participants.map(p => `<@!${p}>`).join(",")} (${participants.length})`);
					db.add(`pocket_${msg.author.id}`, totalhadiah)
			
					collector.stop(msg.author.username);
				}

			     if(participants.length >= 10)
			      {
			        return;
			      }
			});

			collector.on("end", (_collected, reason) => {
				delete currentGames[message.guild.id];
				if (reason === "time") {
					return message.lineReply(`Waktu habis, jamet bet pada...`);
				}
			});
	};
  }
}