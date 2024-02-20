const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'Tsanta', //hercai
  aliases: ['gpt-4'],
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  description: "An AI command powered by TsantaBot Pro",
  usage: "Tsanta [question]",
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
    api.sendMessage(` ▪︎Discutez avec Ai Tsanta développé par TsantaBot. \n\n ▪︎Ex: Tsanta tu es là ? \n\n🤖 Créez votre Chatbot sur bit.ly/tsantabot `, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`✍ | Tsanta est en train d'écrire...`, event.threadID, event.messageID);
  try {
    const response = await herc.question({
      model: "v3",
      content: input
    });
    api.sendMessage(response.reply, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Oh non! Je suis malade 🤧 Je vais chez le docteur et après on peut continuer 😍', event.threadID, event.messageID);
  }
};
