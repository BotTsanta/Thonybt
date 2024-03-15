const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "sdxl",
    aliases: ['sdx'],
    author: "kshitiz",
    version: "2.0",
    cooldown: 300,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "generate an image"
    },
    category: "image",
    guide: {
      en: "[prompt | model]"
    }
  },
  run: async function ({ api, event, args }) {
    let path = __dirname + "/cache/image.png";
    let prompt;
    let model = 1;

    if (args.length === 0) {
      return api.sendMessage("▪︎Code: sdxl [prompt] | [model (1~9)] \n\n ▪︎Ex: sdxl Cute girl | 2", event.threadID, event.messageID);
    }

    if (args.length > 1) {
      const tzt = args.join(" ").split("|").map(item => item.trim());
      prompt = tzt[0];
      model = tzt[1];
    } else {
      prompt = args[0];
    }

    let tid = event.threadID;
    let mid = event.messageID;

    try {
      api.sendMessage("⏰ | sdxl est en train d'imaginer votre texte... ", tid, mid);

      let enctxt = encodeURIComponent(prompt);
      let url = `https://www.api.vyturex.com/sdxl?prompt=${enctxt}&model=${model}`;

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
