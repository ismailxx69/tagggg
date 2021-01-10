const moment = require("moment");
/////////////////////////////////
const viruslog = message => {
  console.log(`⏰ [${moment().format("YYYY-MM-DD HH:mm:ss")}] | ${message}`);
};
/////////////////////////////////
const reqEvent = event => require(`../events/${event}`);
module.exports = client => {
  client.on("message", reqEvent("message"));
  viruslog(`💫 "Event"'ler Kullanıma Hazır`)
};
/////////////////////////////////