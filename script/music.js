const axios = require("axios");
const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const request = require("request");
const yts = require("yt-search");


module.exports = {
  config: {
    name: "music",
    aliases: [],
    version: "1.0",
    role: 1,
    credits: "TsantaBot",
    cooldown: 30,
    shortdescription: "send YouTube music",
    longdescription: "",
    category: "audio",
    usages: "{pn} music name",
    dependencies: {
      "fs-extra": "",
      "request": "",
      "axios": "",
      "ytdl-core": "",
      "yt-search": ""
    }
  },


  run: async ({ api, event }) => {
    const input = event.body;
    const text = input.substring(12);
    const data = input.split(" ");


    if (data.length < 2) {
      return api.sendMessage("💡Ex: Music Mr Said Veloma \n\n 🆓️ Dispo isaky ny 3 minutes\n 🌐 bit.ly/tsantabot ", event.threadID);
    }


    data.shift();
    const videoName = data.join(" ");


    try {
      api.sendMessage(`✅ | TsantaBot va chercher 《${videoName}》\n
⏳ | Attendez svp...`, event.threadID);


      const searchResults = await yts(videoName);
      if (!searchResults.videos.length) {
        return api.sendMessage("Aucune vidéo trouvée !", event.threadID, event.messageID);
      }


      const video = searchResults.videos[0];
      const videoUrl = video.url;


      const stream = ytdl(videoUrl, { filter: "audio" });


      const fileName = `${event.senderID}.mp3`;
      const filePath = __dirname + `/cache/${fileName}`;


      stream.pipe(fs.createWriteStream(filePath));


      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Starting download now!');
      });


      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Downloading video: ${info.videoDetails.title}`);
      });


      stream.on('end', () => {
        console.info('[DOWNLOADER] Downloaded');


        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);
          return api.sendMessage('The file could not be sent because it is larger than 25MB. Essayez un autre', event.threadID);
        }


        const message = {
          body: `✅ | TsantaBot : Votre music est prête \n\n

▶️ | Titre: ${video.title}
⏰ | Duration: ${video.duration.timestamp}`,
          attachment: fs.createReadStream(filePath)
        };


        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
        });
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage(' An error occurred while processing the command.', event.threadID);
    }
  }
};
