module.exports.config = {
  name: "tsanta3D",
  version: "1.0.0",
  role: 0,
  aliases: ["t3D","img3D"],
  hasPrefix: true,
  credits: "TsantaBot",
  description: "generate image from emi 1/1min",
  usages: "tsanta3D [promt]",
  cooldown: 180,
  
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  try { 
  const { threadID, messageID } = event;
  const query = args.join(" ");
  const time = new Date();
  const timestamp = time.toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_tid.png`;
  if (!query) return api.sendMessage("- Ex: tsanta3D Dog \n\n🆓️: Dispo chaque 3min \n🌐: bit.ly/tsantabot", threadID, messageID);
    api.sendMessage(`⏳ | TsantaBot_3D va dessiner 《${query}》`, event.threadID, event.messageID);
  const poli = (await axios.get(`https://ai-tools.replit.app/render?prompt=${query}`, {
    responseType: "arraybuffer", 
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
    setTimeout(function() {
  api.sendMessage({
    body: "✅ Voici votre image 3D 🥰",
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path));
    }, 5000);
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
