const virusEvent = event => require(`../guild/${event}`);
module.exports = client => {
  client.on("guildMemberAdd", virusEvent("guildMemberAdd"));
  client.on("guildMemberRemove", virusEvent("guildMemberRemove"));
};
