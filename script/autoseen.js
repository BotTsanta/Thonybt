const fs = require('fs-extra');
const pathFile = __dirname + '/cache/autoseen.txt';

module.exports.config = {
  name: "vu",
  version: "1.0.0",
  role: 1,
  credits: "Yan Maglinte",
  description: "Turn on/off automatically seen when new messages are available",
  aliases: ["autoseen"],
  cooldown: 0,
  hasPrefix: true,
  usage: "vu on/off",
};

module.exports.handleEvent = async ({ api, event, args }) => {
if (!fs.existsSync(pathFile))
   fs.writeFileSync(pathFile, 'false');
   const isEnable = fs.readFileSync(pathFile, 'utf-8');
   if (isEnable == 'true')
     api.markAsReadAll(() => {});
};

module.exports. run = async ({ api, event, args }) => {
   try {
     if (args[0] == 'on') {
       fs.writeFileSync(pathFile, 'true');
       api.sendMessage('✅ Vu automatique ACTIVÉ.', event.threadID, event.messageID);
     } else if (args[0] == 'off') {
       fs.writeFileSync(pathFile, 'false');
       api.sendMessage('❌ Vu automatique DÉSACTIVÉ', event.threadID, event.messageID);
     } else {
       api.sendMessage('syntax auto_vue invalid\n\n ▪︎Usage: vu on/off  ', event.threadID, event.messageID);
     }
   }
   catch(e) {
     console.log(e);
   }
};
