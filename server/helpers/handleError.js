module.exports = handleError = (error, ctx) => {
  console.log(error);
  if (ctx) {
    ctx.reply("An error occured.");
  }
};
