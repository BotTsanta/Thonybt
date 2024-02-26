const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "tsanta3D",
    aliases: ['img3D'],
    author: "TsantaBot",
    version: "2.0",
    cooldown: 160,
    role: 0,
    shortDescription: {
      en: "tsanta3D prompt 1~9"
    },
    longDescription: {
      en: "generate an image 3D"
    },
    category: "image",
    guide: {
      en: "tsanta3D [prompt - model]"
    }
  },
  run: async function ({ api, event, args }) {
    let path = __dirname + "/cache/image.png";
    let prompt;
    let model = 1;

    if (args.length === 0) {
      return api.sendMessage("▪︎ Code: tsanta3D [prompt] - [model] \n\n ■NB: Afaka soloina modèle 《1~9》 hafa ilay modèle io, Aucun résultat kosa raha tsy asina《-》 sy chiffre. \n\n ▪︎Ex: tsanta3D Cute girl - 2 \n\n🆓️ Dispo chaque 3min  \n\n 🤖TsantaBot: https://bit.ly/tsantabot", event.threadID, event.messageID);
    }

    if (args.length > 1) {
      const tzt = args.join(" ").split("-").map(item => item.trim());
      prompt = tzt[0];
      model = tzt[1];
    } else {
      prompt = args[0];
    }

    let tid = event.threadID;
    let mid = event.messageID;

    try {
      api.sendMessage("⏳ | TsantaBot_3D est en train d'imaginer votre texte...", tid, mid);

      let enctxt = encodeURIComponent(prompt);
      let url = `https://ai-tools.replit.app/sdxl?prompt=${enctxt}&styles=${model}`;

      let response = await axios.get(url, { responseType: "stream" });

      response.data.pipe(fs.createWriteStream(path));

      response.data.on("end", () => {
        api.sendMessage({ attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
      });
    } catch (e) {
      return api.sendMessage(e.message, tid, mid);
    }
  }
};
