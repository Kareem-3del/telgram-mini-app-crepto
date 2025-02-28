const createUser = require("./createUser");
const handleError = require("./handleError");
const showMenu = require("./showMenu");
const alreadyReferred = require("./alreadyReferred");
const User = require("../models/userModel");
const AdminRules = require("../models/adminRulesModel");

module.exports = handleReferral = async (ctx) => {
  const { first_name, last_name, username } = ctx.from;
  try {
    let inviteId = ctx.payload;
    //If user clicked a forged link
    if (isNaN(inviteId)) {
      return await ctx.reply(
        "Sorry that link is invalid. Please check and try again."
      );
    }

    inviteId = parseInt(inviteId);

    const chatId = ctx.from.id;

    //Find the invite link owner
    const referrer = await User.findOne({ chatId: inviteId });
    if (!referrer) {
      return await ctx.reply(
        "Sorry that link is invalid. Please check and try again."
      );
    }

    //If user clicked their own link
    if (inviteId === chatId) {
      return await ctx.reply("You cannot refer yourself.");
    }

    //Check if user already has an account
    const userExists = await User.findOne({ chatId });
    if (userExists) {
      return await ctx.reply("You already have an account.");
    }

    // Check if user has already been referred
    const alreadyReferredCheck = await alreadyReferred(chatId);

    //If an error prevented checking
    if (alreadyReferredCheck.error) {
      return await ctx.reply("An error occured.");
    }

    //If they've already been referred by someone
    if (alreadyReferredCheck.result) {
      return await ctx.reply("You've been referred before.");
    }

    //Process the referral
    referrer.referrals.push({
      firstname: first_name,
      lastname: last_name,
      username,
    });

    const adminRules = await AdminRules.find();

    //Credit referrer (1 point)
    referrer.balance += adminRules[0].referralPoints;

    await referrer.save();

    //Create user account
    await createUser(ctx);

    await showMenu(ctx);
  } catch (error) {
    console.log(error);
    handleError(error, ctx);
  }
};
