const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const KievRPSSecAuth = "FAByBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACAfiIl3mccxJMAT1reY94RRkDkvMNUnbbCm3eAeKw2vLr2v/k6lKF2Ci0vPz4Z0agFNqw2O4HcSfmKLgFKvKUVqqPHVt9UOODsyLax/VEOWFyKfafVwnPdyKJRmO00lyNQ3cK8+8r7evWlGpGaTwwUeMMENDeT5urwdXaNBub6Nxef+uJ2H5XjKuCf9qPANpkXeM8sqDe+nVSGLapmPgIqkpk02kgPm3PE18dkFyPX7iDV5zHdJF5D4vAnnm55EMHmQmsZVdctcYsm7JoIH0sxYY4iho0OIE+905NogPNGUn5xRlvHkYfWZKzALpRGTV33+R6XRgm4GJW7QGnBdpFB+4YpBBcKfy22loX8RIRlr/mWEZ90wVub70pjIrBQQyLSUd60uA4PglRyxlb0ULgL4vpM+2DTlah31LAfY1MIUUI/h0Q3ng4fvFpjuDcsrwCk5TqqxoXg0gMEqX1S+n45Kr/MW/CEQ8m9u6EBbBpEdQBw/q5byaoTEzPoj23lbRXT/pV5ANFy95XSzfp2RMyXsSBjYrqL90IuybJPHsgBeK9DABEzL3ZgKvG11hcq6LdRtRtC19kzuw7IxJZAGH3NzvBGLiHpj6nj1Ri5mHPn7U+7H11VJ7Vazy6Ugj4W+qzGNVSEMVhbtK51u5/0D8CGlmbi6Iu21Re5I1xz8URVROV4BomJ1avySlI30fFltJz/HIkhcilGqYj+hHUykZuv+eFVJToKWkazaLmriVkjyoGxrsxAdySl7yl/nanU02lIGcRicUkLKbIRUUNLH487LXhZ5u1AVbF/zmxSHm4DmCb2GiTF63+SnYwCV6gwl8Az5zyD7gB2p1Nx8rSwXVu29tRgRi9RTq1D19qYRoItLECuAJmt1Il5dWgXfVaz6Rb05zpyAGZ2FyXQCk4nlv587W2o+zsfuWcd7XVKkqPWPhp2E08LGydZZJhkmlJ4F9l16/N9tlVU/cHpjDkEULBNdZVOJMFgNZltWfMqeq1PQaQ2DqvaxFPKmDBg4caRN1HHJzchL9v9ouUQSK/PV97eZCvBrWalfGeBXF818CKhSSmh+oTeR8eZDTl4CiNCVr7SZz4gQZRkIdEV8IkZHbZGAz+V0jafRpXDF95iQHiwAcMQnaK3eGn26+huo7Ky/Q3kBBtXYbElCYxlyqQMWfd+UQeuCGl2rkHg3gIZG67V3srFnFZBB7enKZsRi29wLaVhV23dB/ahXIi2QiYpUg/4yXQlF91LalNFwjpR0Q3jLhJxrvZWiU193fFKp4jtTSA2LPKGxMLaVunoszSEUGEnb+fhAMDtYHE+W9lkB0Vro0CMSRQAY3whNSrblKndGRAvOQtbLpsL57AwXx8TB9EuFVSAKySPEpxoEmne9s2Bpww4Jx7L2ePzY9ZJTt9OV6YcFXfTDIX2hoB44NhhPSyfXoVjUmGh3hu1n6FABilu1fFwznlwm3O5DOvGBCh6bV6g==";
const _U = "1m-9JS15f0PkyPsdvClShIHkJz0RDekyHci3C3S9A2HIKwfZGmZ9Qmat4lbqDzDNDWaK8vSNrKO3SJUptVSVWrPFA7XHrifZlVE-1dIcBAysP_UeRlLU8kRk3a8IixA5Kj2VN-XUYG5Y8nP9EmkQpk-qx1qVQXRKv1YJiBv4MjMvkcZewvqaoE9PjwrY2p8dL7LfUP-dFFtiKSemldOnRwj_vgjp00XkKksilEuX9Mu4";

module.exports = {
  config: {
    name: "bing",
    aliases: ["Bng"],
    version: "1.0.2",
    role: 0,
    usePrefix: true,
    cooldown: 600,
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
