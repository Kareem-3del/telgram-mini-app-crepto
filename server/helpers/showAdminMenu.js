const handleError = require("./handleError");
require("dotenv/config");
let miniAppUrl = process.env.ADMIN_MINI_APP_URL;
module.exports = showAdminMenu = async (ctx) => {
  try {
    const message = `Hello Admin👋\nWelcome to the Admin Bot.\n\nClick this button to access the admin panel👇`;
    await ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open Admin Panel",
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
