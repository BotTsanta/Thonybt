module.exports.config = {
  name: 'mp',
  aliases: ['pm','inbox', 'message'],
  version: '1.0',
  credits: 'TsantaBot',
  countDown: 5,
  role: 1,
  shortDescription: {
    en: 'Send anonymous message to user'
  },
  longDescription: {
    en: 'Send anonymous message using thread or user ID'
  },
  category: 'box chat',
  guide: {
    en: '{p}pm id text'
  }
};

module.exports.run = async function ({ api, event, args }) {
  if (args.length < 2) {
    return api.sendMessage(
      'AJOUTER UN UTILISATEUR \n▪︎ Envoyer un message anonyme vers un utilisateur ID. \n ▪︎ Usage: mp [ID_Utilisateur] [message] \n ▪︎ Ex: mp 012345678901234 Salut Fara !',
      event.threadID,
      event.messageID
    );
  }

  const idBox = args[0];
  const message = args.slice(1).join(' ');

  api.sendMessage({
    body: message,
    mentions: [{
      tag: '@pm',
      id: event.senderID
    }]
  }, idBox, () => {
    api.sendMessage(
      `✅ Message envoyé  à [${idBox}] \n\n📄 | "${message}" `,
      event.threadID
    );
  });
};
