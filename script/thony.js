const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'thony', //hercai
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  description: "An AI command powered by TsantaBot",
  usage: "thony [question]",
  credits: 'TsantaBot',
  cooldown: 15,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(` ▪︎Discutez avec Ai by Thony. \n\n ▪︎Ex: thony tu es là ? `, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`✍ | Thony est en train d'écrire...`, event.threadID, event.messageID);
  try {
    const response = await herc.question({
      model: "v3",
      content: input
    });
    api.sendMessage(response.reply, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Oh non! Je suis malade 🤧 Je vais chez le docteur bit.ly/tsantabot et après on peut continuer 😍', event.threadID, event.messageID);
  }
};
