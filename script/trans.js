module.exports.config = {
  name: "traduction",
  version: "1.0.0",
  aliases : ['translate', 'traduire','adikao','trans', 'Translation'],
  role: 0,
  hasPrefix: true,
  description: "Text translation",
  usages: "trans mg [promt]",
  credits: "TsantaBot",
  cooldown: 15,
};
module.exports.run = async ({
  api,
  event,
  args,
  prefix
}) => {
  const request = require("request");
  const targetLanguage = args[0];
  const content = args.slice(1).join(" ");
  try {
    if (content.length === 0 && event.type !== "message_reply") return api.sendMessage(`💡 Traduction Intelligente sur Facebook.\n\n ▪︎ Usage1 : Traduction [mg] [Textes] \n ▪︎Usage2: Répondre un message + Traduction mg\n\n▪︎NB: Afaka soloina langue hafa ilay mg. \n mg = Malagasy \nfr = Français \n en = English \n zh = Chinois \n es = Espagnol ... \n\n ▪︎Ex: Traduction mg Hello, Welcome `, event.threadID, event.messageID);
    let translateThis, lang;
    if (event.type === "message_reply") {
      translateThis = event.messageReply.body;
      lang = targetLanguage || 'tl';
    } else {
      translateThis = content;
      lang = targetLanguage || 'tl';
    }
    return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
      if (err) return api.sendMessage("An error has occurred!", event.threadID, event.messageID);
      const retrieve = JSON.parse(body);
      let text = '';
      retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
      const fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];
      api.sendMessage(`${text}\n\n\n___________________________\n🔄  ${fromLang} => ${lang}`, event.threadID, event.messageID);
    });
  } catch (error) {
    api.sendMessage(error.message, event.threadID, event.messageID);
  }
};
