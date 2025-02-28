const handleError = require("./handleError");
require("dotenv/config");
let miniAppUrl = process.env.MINI_APP_URL;
module.exports = showMenu = async (ctx) => {
  let { first_name, last_name, username } = ctx.from;
  let greetingName = username ? username : `${first_name} ${last_name}`;
  try {
    const message = `Hey there, ${greetingName}👋\nWelcome to the Test Mini App.\n\nPlease onboard with the button below.`;
    await ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Start App",
              web_app: {
                url: miniAppUrl,
              },
            },
          ],
        ],
      },
    });
  } catch (error) {
    handleError(error, ctx);
  }
};
