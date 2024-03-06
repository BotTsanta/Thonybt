const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const KievRPSSecAuth = "FAByBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACBed+eFJOBzrMASkaQDI1P/WcpmUPrOhvd3yRR/yldmxaEAwEhiEY/4IwhqLDPlz5lYEI2LF17IcJCOU0TrS0QjKOaHHSVHw2JDXHpwJGnFkbSvpAcB3SHba0YSQfkSP2Ce37FDmODLAResUb/9oof5FyDL1D2rf8wQ3XXoS4LXfU4CS9qelHVPWMK7jef5muK2/3OB9gcWjjEDOIS4jtJOUuYjL7dL4qAeMCw6VR9HbUf3X6MadP8NQeGH1IbDgBKAyB+RSNaaDsmf4AKwQ3Z3ROTgBDPLWmyO49ZzXTKGpGX/AT3ri//Xjzusp5x/ihv9ACMBD0diLOgtv8jTy40Zyul6cnkfoKWr+pr1+aV2IugXmhn0NY0LvCvpuFko3B3LPpW6OkXhW/7FIleVgcGbmkcHYZEvJWlLOGtdAUxJwN4bjBH2+gO42eQ2ZONYbWgVOY660Z/JxNsu+xgpbOgXHpthwZoB8y405i8y3II4PVgJo8s+rG3AY+Dfgome/q556fh9sAhO8xHH3AD2Mxi6zM9GpLGdu2Oa4z1GFP14asPxlXQzWVkO3JVa8+nD3DfCIxO2dMC3MsYMk6y0c/C1Y8n5Ba3e7RnVz9PGM/WnnSQ7FrQEKO+kz3rt27Um8zF2EYUmTnqJpNM0rKhP4EmyOUUTst8GyhCp6fSDbAg1AOHPZWSK0LKtTas7udXQAXBHkUoHFR5wVZQZZr645JL7UCkTF2gET5AipPXcw68NTHo9Z9hj2XPe4txYNO6OLhSBhZY/3pKJbjlbjSvvDNS/17FXi7sUwOYVil6sXXGZfuwnccsObyjdIZcdtC8o+CatMq877lZUdtzi8BtgjJKAcL7CVkw4w9REBvlL61Z0pA6nOOr3UhmKxghucjYrd1xVweHrKyX7nFipl0+QriCOmO/SIiC0vRDl0TQLtWZZFJTYeUv82LJN8bGO8aAd7m+MLedJ+Yy8skhPlGt6qU6GTK76h3Cm/m0HSpWmGSPq5iotyggquoDXhrLZtWSMDEpAEzL1DZeA6yf1DPR7bFuFRjd+YaYh2aF+xqLgdES1ANSDnamcDvczxiY0VNzLIIspCt6mNs78kNKk9knI1hH4rvjxjMhdEXx5puiarcsAbY1MFAEBQxH6AWk2KDFDv7yxHfW8lCO4XO7J7EylR629rSgwtRRatGUbi+y7pjFuSNViCI5Ds0urtZmpY8FV3ScOdhDRisybcl/O8IXodYtLCtryO9v+XM4Fyu2BupDlK/dKlFseJ3V/NHy+uA2zMPGDaxV8olKGtVC5N1/lUltxfe6hNssVDW8t7lcWyOgK8IHOD38EDWnXdQfodyRvuau8KKDVLYxYkVDL3VL5/RYEoh0T45eb8FHJioKUaDmHinhtKHYLlCF254FFnB33VQaccvRE1ZvJT6vmIv7WsaqB70qSsS1q4jHMHFABOKNTFvCjw+KHeeRCL/CBthCotVg==";
const _U = "1_IS67p9PO_znlXB1juVE-_Optlp5wHKOQbeChzefQK4MC8y-qZ8jaRP6obefcI0XR1fbPJVcjCi4PQ_fdPZiFykmDhq5hWO9Lk1qFXQ9Zy0cBHaRmP3x62niLP4dwFwyZbeB2aHKqUUK12M1jJgwgvKT9VoZjy-0X1H6xondNAYvGM3dNi9M7NQUByJAol76pIi2_F_xHgmsi0FV_bjl8vCpjFHNc81SW0-uwXA3vIo";


module.exports = {
  config: {
    name: "bing2",
    aliases: ["Bng2"],
    version: "1.0.2",
    role: 1,
    usePrefix: true,
    cooldown: 6,
    shortDescription: {
      en: "dalle3 sur Facebook"
    },
    longDescription: {
      en: ""
    },
    category: "dalle3  pro",
    guide: {
      en: "{prefix}bing <search query> -<number of images>"
    }
  },

  run: async function ({ api, event, args }) {
    const uid = event.senderID;
    const permission = [`${uid}`];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        "You don't have enough permission to use this command. Only admin can do it.",
        event.threadID,
        event.messageID
      );
      return;
    }

    const keySearch = args.join(" ");
    const indexOfHyphen = keySearch.indexOf('-');
    const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

    try {
      api.sendMessage("⏳ | TsantaBot et Bing sont en train d'imaginer votre textes... \n\n 🆓️ Dispo chaque 10min\n 🚀 Bing2 : Dispo chaque 5secondes\n 🤖 Créez votre Chatbot ici: bit.ly/tsantabot", event.threadID, event.messageID); // Added message here

      const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("Aucune images trouvées.. Essayer un autre", event.threadID, event.messageID);
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `✅ | TsantaBot: Voici votre images :`
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("Oh no! Je suis malade...🥶 \n\n 💡Tuto: Bing + prompt\n ▪︎Ex: Bing Chicken cyborg\n\n Raha hampiasa Bing pro sans limite dia soraty: Bing2", event.threadID, event.messageID);
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
};
