const Guild = require('../models/guild');
const config = require('../config')
const { MessageEmbed } = require('discord.js')

  // module.exports.swap_pages = swap_pages;
  // module.exports.swap_pages2 = swap_pages2;
  module.exports.formatRupiah2 = formatRupiah2;
  module.exports.formatRupiah = formatRupiah;
  module.exports.capitalize = capitalize;
  module.exports.getCMD = getCMD;
  module.exports.getRandomInt = getRandomInt;
  module.exports.formatNumber = formatNumber;
  module.exports.shorten = shorten;
  module.exports.formatNumber = formatNumber;
  module.exports.formatNumberK = formatNumberK;
  module.exports.getImageURL = getImageURL;

  function capitalize(str) {
    const lower = str.toLowerCase()
    return str.charAt(0).toUpperCase() + lower.slice(1)
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getImageURL(item) {
		let found = null;
		let current = item.itemimages_detail;
		while (!found) {
			if (current.primary) found = current.primary.url;
			if (current.urls) found = current.urls[0].url;
			const key = Object.keys(current)[0];
			if (!key) break;
			current = current[key];
		}
		return found;
	}

  function shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

  function formatNumber(number, minimumFractionDigits = 0) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			minimumFractionDigits,
			maximumFractionDigits: 2
		});
	}

  function formatRupiah2(angka, prefix) {
    if(angka=="" || angka=="null" || angka==null || angka==undefined){
      return "";
    } else {
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split	= number_string.split(','),
            sisa 	= split[0].length % 3,
            rupiah 	= split[0].substr(0, sisa),
            ribuan 	= split[0].substr(sisa).match(/\d{3}/gi);
  
        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
  
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : prefix + rupiah;
    }
  }

  function formatRupiah(money) {
    return new Intl.NumberFormat('id-ID',
      { currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  };

  function formatNumber(number, minimumFractionDigits = 0) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			minimumFractionDigits,
			maximumFractionDigits: 2
		});
	}

	function formatNumberK(number) {
		return number > 999 ? `${(number / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}K` : number;
	}

  async function getCMD(client, message, input) {
      const guildDB = await Guild.findOne({
          guildID: message.guild.id
      });

      const embed = new MessageEmbed()

      const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

      let info = `Perintah \`${capitalize(input)}\` gaada.`;

      if (!cmd) {
          return message.channel.send(embed
          .setColor('#ff0000')
          .setDescription(info)
          .addField('Kalo mau nambah, DM', '<@!325260673015873548>')
          );

      }

      if (cmd.name) info = `**Nama perintah**: ${capitalize(cmd.name)}`
      if (cmd.aliases) info += `\n**Sebutan lainnya**: ${cmd.aliases.map(a => `\`${a}\``).join(', ') ? cmd.aliases.map(a => `\`${a}\``).join(', ') : 'Tidak ada'}`;
      if (cmd.description) info += `\n**Keterangan perintah**: ${cmd.description}`;
      if (cmd.yangbisapakai) info += `\n**Yang bisa pakai**: ${cmd.yangbisapakai}`;
      if (cmd.usage) {
          info += `\n**Cara pemakaian**: ${guildDB.prefix}${cmd.usage}`;
          //set title bot name
          embed.setTitle(`${client.user.username} | Help`);
          embed.setFooter('<> = Wajib | [] = Tidak wajib')
      }
      if (cmd.usage2) info += `\n**Usage 2**: ${guildDB.prefix}${cmd.usage2}`;

      return message.channel.send(embed.setColor(config.COLOR).setDescription(info));
  }

  // const { MessageButton, MessageActionRow } = require('discord.js')
  // async function swap_pages(client, message, description, TITLE) {
  //    let prefix = config.prefix;
  //    let cmduser = message.author;
   
  //    let currentPage = 0;
  //    //GET ALL EMBEDS
  //    let embeds = [];
  //    //if input is an array
  //    if (Array.isArray(description)) {
  //      try {
  //        let k = 20;
  //        for (let i = 0; i < description.length; i += 20) {
  //          const current = description.slice(i, k);
  //          k += 20;
  //          const embed = new MessageEmbed()
  //            .setDescription(current)
  //            .setTitle(TITLE)
  //            .setColor(`#2f3136`)
  //            //.setFooter(ee.footertext, ee.footericon)
  //          embeds.push(embed);
  //        }
  //        embeds;
  //      } catch {}
  //    } else {
  //      try {
  //        let k = 1000;
  //        for (let i = 0; i < description.length; i += 1000) {
  //          const current = description.slice(i, k);
  //          k += 1000;
  //          const embed = new MessageEmbed()
  //            .setDescription(current)
  //            .setTitle(TITLE)
  //            .setColor(`#2f3136`)
  //            //.setFooter(ee.footertext, ee.footericon)
  //          embeds.push(embed);
  //        }
  //        embeds;
  //      } catch {}
  //    }
  //    if (embeds.length === 0) return message.channel.send({embeds: [new MessageEmbed()
  //    .setTitle(`Hehe`)
  //    .setColor(`#2f3136`)]}).catch(e => console.log("CRASH"))
  //    if (embeds.length === 1) return message.channel.send({embeds: [embeds[0]]}).catch(e => console.log("CRASH"))
   
  //    let button_back = new MessageButton().setStyle('PRIMARY').setCustomId('1').setEmoji("885406663123795968").setLabel("Kembali")
  //    let button_home = new MessageButton().setStyle('PRIMARY').setCustomId('2').setEmoji("882725546449051648").setLabel("Awal")
  //    let button_forward = new MessageButton().setStyle('PRIMARY').setCustomId('3').setEmoji('898128425099866172').setLabel("Lanjut")
  //    const allbuttons = [new MessageActionRow().addComponents([button_back, button_home, button_forward])]
  //    //Send message with buttons
  //    let swapmsg = await message.channel.send({   
  //        //content: `***Click on the __Buttons__ to swap the Pages***`,
  //        embeds: [embeds[0]], 
  //        components: allbuttons
  //    });
  //    //create a collector for the thinggy
  //    const collector = swapmsg.createMessageComponentCollector({filter: (i) => i.isButton() && i.user && i.user.id == cmduser.id && i.message.author.id == client.user.id, time: 180e3 }); //collector for 5 seconds
  //    //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
  //    collector.on('collect', async b => {
  //        if(b.user.id !== message.author.id)
  //          return b.reply(`**Kamu tidak dapat menggunakan button.**`, true)
  //          //page forward
  //          if(b.customId == "1") {
  //            //b.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
  //              if (currentPage !== 0) {
  //                currentPage -= 1
  //                await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //                await b.deferUpdate();
  //              } else {
  //                  currentPage = embeds.length - 1
  //                  await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //                  await b.deferUpdate();
  //              }
  //          }
  //          //go home
  //          else if(b.customId == "2"){
  //            //b.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
  //              currentPage = 0;
  //              await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //              await b.deferUpdate();
  //          } 
  //          //go forward
  //          else if(b.customId == "3"){
  //            //b.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
  //              if (currentPage < embeds.length - 1) {
  //                  currentPage++;
  //                  await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //                  await b.deferUpdate();
  //              } else {
  //                  currentPage = 0
  //                  await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //                  await b.deferUpdate();
  //              }
           
  //        }
  //    });
  //  }

  //  async function swap_pages2(client, message, embeds) {
  //    let currentPage = 0;
  //    let cmduser = message.author;
  //    if (embeds.length === 1) return message.channel.send({embeds: [embeds[0]]}).catch(e => console.log("CRASH"))
  //    let button_back = new MessageButton().setStyle('PRIMARY').setCustomId('1').setEmoji("885406663123795968").setLabel("Kembali")
  //    let button_home = new MessageButton().setStyle('PRIMARY').setCustomId('2').setEmoji("882725546449051648").setLabel("Awal")
  //    let button_forward = new MessageButton().setStyle('PRIMARY').setCustomId('3').setEmoji('898128425099866172').setLabel("Lanjut")
  //    const allbuttons = [new MessageActionRow().addComponents([button_back, button_home, button_forward])]
  //    let prefix = client.settings.get(message.guild.id, "prefix");
  //    //Send message with buttons
  //    let swapmsg = await message.channel.send({   
  //        //content: `***Click on the __Buttons__ to swap the Pages***`,
  //        embeds: [embeds[0]], 
  //        components: allbuttons
  //    });
  //    //create a collector for the thinggy
  //    const collector = swapmsg.createMessageComponentCollector({filter: (i) => i.isButton() && i.user && i.user.id == cmduser.id && i.message.author.id == client.user.id, time: 180e3 }); //collector for 5 seconds
  //    //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
  //    collector.on('collect', async b => {
  //        if(b.user.id !== message.author.id)
  //          return b.reply(`**Kamu tidak dapat menggunakan button.**`, true)
  //          //page forward
  //          if(b.customId == "1") {
  //            //b.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
  //              if (currentPage !== 0) {
  //                currentPage -= 1
  //                await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //                await b.deferUpdate();
  //              } else {
  //                  currentPage = embeds.length - 1
  //                  await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //                  await b.deferUpdate();
  //              }
  //          }
  //          //go home
  //          else if(b.customId == "2"){
  //            //b.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
  //              currentPage = 0;
  //              await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //              await b.deferUpdate();
  //          } 
  //          //go forward
  //          else if(b.customId == "3"){
  //            //b.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
  //              if (currentPage < embeds.length - 1) {
  //                  currentPage++;
  //                  await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //                  await b.deferUpdate();
  //              } else {
  //                  currentPage = 0
  //                  await swapmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
  //                  await b.deferUpdate();
  //              }
           
  //        }
  //    });
   
  //  }