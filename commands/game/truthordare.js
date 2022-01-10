const Discord = require('discord.js')
const {
  player,
  system1,
  system2
} = require('../../index')

module.exports = {	
  name: 'truthordare',
  category: 'game',
  aliases: ['tod'],
  description: 'G.',
  usage: `truthordare`,

  run: async (client, message, args) => {

    // var system1 = false
    // var system2 = false
    // var player = []
    var pemain = true

		var listpemainhaha = "Daftar pemain : \r\n"
		console.log(args);

        if(args[0] === "start"){
            if(!system1){
				player.push(`${message.author.id}`)
				listpemainhaha = "Daftar pemain : \r\n"
				const embed = new Discord.MessageEmbed()
					.setDescription(`Game TOD telah dimulai, ${message.author.username} telah ditambahkan dalam permainan, pemain yang ingin berganbung silahkan mengetik \`w!tod\` untuk bergabung dalam game, game akan dimulai dalam waktu 30 detik lagi!`)
					.setTitle("Truth or Dare")
					.setColor("#FF0000");
				message.channel.send(embed)	
				system1 = true;
				setTimeout(() => {
					system2 = true;
					message.channel.send(listpemain())
					message.channel.send("Pemain akan di tentukan dalam waktu 10s")
					var random = Math.floor(Math.random() * player.length)
					var randomtantangan = Math.floor(Math.random() * 2)
					var choosedplayer = "<@!" + player[random] + ">"
					var tod = randomtantangan == 0? 'Truth' : 'Dare'
					setTimeout(() => {	
						message.channel.send("Selamat kepada " + choosedplayer + "Anda terpilih sebagai orang yang akan menerima " + tod + " di game kali ini.")
						listpemainhaha = "Daftar pemain : \r\n"
						system1 = false;
			            system2 = false;
			            player = [];
					}, 10000);
				}, 30000);
			}else{
				message.channel.send(`Game sedang berjalan...`)
			}
        }else if(system1){
			if(!system2){
					if(player.indexOf(message.author.id) >= 0){
						pemain = false
					}
					if(pemain){
						player.push(`${message.author.id}`)
						message.channel.send(`${message.author.username} telah ditambahkan dalam permainan!!!`)
					}else{
						message.channel.send(`${message.author.username} telah berada di dalam permainan!!!`)
						pemain = !pemain
					}
			}
		}else message.channel.send("Game belum dimulai")

        function listpemain(){
            for(i=0;i<player.length;i++){
                listpemainhaha += (i+1) + ". <@!" + player[i] + "> \r\n"
            }
            return listpemainhaha
        }
    }
}
