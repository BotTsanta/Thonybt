module.exports.config = {
  name: "bio",
  version: "1.0.0",
  role: 1,
  usePrefix: false,
  credits: "PSTeam",
  description: "Change bot's bio",
  commandCategory: "admin",
  usages: "bio [text]",
  cooldown: 5
};

module.exports.run = async ({ api, event, global, args, permission, utils, client, Users }) => {
  api.changeBio(args.join(" "), (e) => {
    if (e) {
      api.sendMessage("An error occurred: " + e, event.threadID);
      return;
    }
    api.sendMessage("Bio Bot a été changé: " + args.join(" "), event.threadID, event.messageID);
  });
};
