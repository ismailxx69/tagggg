//////////////////////////////////////////
const Discord = require("discord.js");
const ayarlar = require("./database/ayarlar.json");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
const chalk = require('chalk')
const client = new Discord.Client();
//////////////////////////////////////////
require("./util/eventLoader")(client);
//////////////////////////////////////////
const log = message => {
  console.log(`⏰ [${moment().format("YYYY-MM-DD HH:mm:ss")}] | ${message}`);
};
//////////////////////////////////////////
////----------------------\\\\ STATUS ////----------------------\\\\ 
  client.on("ready", async () => {
    await client.user.setStatus("idle");
    client.user.setActivity(`Aquiver Code`, { type: "WATCHING"});  
    log("🤖 Tüm Komutlar Başarıyla Yüklendi | Virus İyi Kullanımlar Diler :)")
  })
//////////////////////////////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(chalk.magenta(`🌟 Toplamda ${files.length} komut yüklenecek.`));
  files.forEach(f => {
    let props = require(`./komutlar/${f}`)
    log(chalk.blue(`🌀 Yüklenen komut: ${props.help.name}.`));
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
//////////////////////////////////////////
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//////////////////////////////////////////
client.unload = command => {
  return new Promise((resolve, reject) => { 
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) { 
      reject(e);
    }
  });
};
//////////////////////////////////////////
// Permissions
//////////////////////////////////////////
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
//////////////////////////////////////////
//login
client.login(ayarlar.token).then(a => {
  log(chalk.green(`✅ Tokene Bağlanıldı | Bot "${client.user.tag}" İsmi İle Giriş Yaptı.`))}).catch(a => {
  return log('⛔ Bot Başlatılamadı Hatalı Token !')
})
//////////////////////////////////////////

////----------------------\\\\ TAG LOG ////----------------------\\\\ 
const database = require('./database/tag-log.json');



client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const virustag = database.tag
  const virussunucu = database.sunucu
  const viruslog =  database.log
  const virusrol = database.rol

  
  try {

  if (newUser.username.includes(virustag) && !client.guilds.cache.get(virussunucu).members.cache.get(newUser.id).roles.cache.has(virusrol)) {
  await client.channels.cache.get(viruslog).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${virustag} Tagımızı Aldığı İçin <@&${virusrol}> Rolünü Verdim`));
  await client.guilds.cache.get(virussunucu).members.cache.get(newUser.id).roles.add(virusrol);
  await client.guilds.cache.get(virussunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${virustag} Tagımızı Aldığın İçin ${client.guilds.cache.get(virussunucu).roles.cache.get(virusrol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(virustag) && client.guilds.cache.get(virussunucu).members.cache.get(newUser.id).roles.cache.has(virusrol)) {
  await client.channels.cache.get(viruslog).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${virustag} Tagımızı Çıkardığı İçin <@&${virusrol}> Rolünü Aldım`));
  await client.guilds.cache.get(virussunucu).members.cache.get(newUser.id).roles.remove(virusrol);
  await client.guilds.cache.get(virussunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${virustag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(virussunucu).roles.cache.get(virusrol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
 log(`Tag Log'da Bir Hata Oluştu ! ${e}`)
 }
}
});




////----------------------\\\\ KOMUTLAR ////----------------------\\\\ 