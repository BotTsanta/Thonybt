const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'Google', //hercai
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  description: "An AI command powered by TsantaBot",
  usage: "coogle [question]",
  credits: 'TsantaBot',
  cooldown: 10,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(` ▪︎Discutez avec Ai développé par Google \n\n ▪︎Ex: google Trouvez moi un exemple de CV`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔎 | Google est en train d'écrire...`, event.threadID, event.messageID);
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
