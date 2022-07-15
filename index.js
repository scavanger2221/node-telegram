import * as functions from "firebase-functions";
import {Telegraf} from "telegraf";
import fetch from "node-fetch";
import rollLink from "./sourceRandomizer.js";

const getWaifuUrl = async (type) => {
  const waifu = rollLink()
  const response = await fetch(waifu.getUrl(type))
  const json = await response.json()
  const result= waifu.parse(json)  

  return result
};

const config = functions.config();

const bot = new Telegraf(config.telegram.token);

bot.catch((err, ctx) => {
  functions.logger.error("[Bot] Error", err);
  return ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`, err);
});


// command waifu
bot.command("waifu", (ctx) => {
  // get args  f
  const args = ctx.message.text.split(" ");
  console.log(args);

  getWaifuUrl("nsfw")
  .then((url) => ctx.reply(url))
  .catch((err) => ctx.reply(err.message));
});

bot.command("waifusafe", (ctx) => {
  // get args
  console.log("waifusafe");
  getWaifuUrl("sfw")
      .then((url) => ctx.reply(url))
      .catch((err) => ctx.reply(err));
});
bot.launch();

// bot.telegram.setWebhook(`https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${FUNCTION_NAME}`);

// functions.https.onRequest(bot.handleUpdate);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// })

export const echoBot = functions.https.onRequest(async (request, response) => {
  functions.logger.log("Incoming message", request.body);
  try {
    await bot.handleUpdate(request.body);
  } catch (error) {
    functions.logger.error("Error", error);
  } finally {
    response.status(200).end();
  }
});
