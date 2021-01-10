/////////////////////////////////////////////////////////////////////////////
////----------------------\\\\ MODÜL TANIMLARI ////----------------------\\\\ 
const Discord = require("discord.js");
module.exports.run = (client, message, args) => {
/////////////////////////////////////////////////////////////////////////////
////----------------------\\\\ VERİ TANIMLARI ////----------------------\\\\   
const tagdata = require('../database/tag-log.json');
////----------------------\\\\ ROL ENGEL ////----------------------\\\\ 
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setAuthor(`Başarısız !`).setDescription(`Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta`))
/////////////////////////////////////////////////////////////////////////////
////----------------------\\\\ TAG TANIMI ////----------------------\\\\ 
let tag = tagdata.tag
/////////////////////////////////////////////////////////////////////////////
////----------------------\\\\ TAGLILARI DİĞER ÜYELERDEN AYIRMA ////----------------------\\\\   
const virustag = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size
/////////////////////////////////////////////////////////////////////////////
////----------------------\\\\ EMBED ////----------------------\\\\ 
const embed = new Discord.MessageEmbed()
.setColor('GREEN')
.setTimestamp()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
 message.channel.send(embed .setFooter("Develop By Virus")
 .setDescription(`**Toplam Taglı Üye Sayısı =** ${virustag}`));
};
/////////////////////////////////////////////////////////////////////////////
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["s"],
permLvl: 0,
}
/////////////////////////////////////////////////////////////////////////////
exports.help = {
name: 'say'
}
/////////////////////////////////////////////////////////////////////////////