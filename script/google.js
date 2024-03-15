const axios = require('axios');
module.exports.config = {
  name: 'google',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gogle'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
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
    api.sendMessage(`Simple Ai by Google: \n ▪︎Ex: Google Faites moi un CV pour une poste Famme de ménage`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔎 En train de recherche...`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://openaikey-x20f.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
