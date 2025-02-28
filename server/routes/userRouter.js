const express = require("express");
const User = require("../models/userModel");
const AdminRules = require("../models/adminRulesModel");
const isSameDay = require("../helpers/isSameDay");
const userRouter = express.Router();

//Fetch user account details
userRouter.get("/:chatId", async (req, res) => {
  const { chatId } = req.params;
  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required" });
    }

    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist" });
    }

    res.status(200).json({ success: true, data: userDetails });
  } catch (error) {
    console.log("Server error\n", error);
    res.status(500).json({ success: false, error: error });
  }
});

userRouter.get("/referrals/:chatId", async (req, res) => {
  const { chatId } = req.params;
  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required" });
    }

    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist" });
    }

    res.status(200).json({ success: true, data: userDetails.referrals });
  } catch (error) {
    console.log("Server error\n", error);
    res.status(500).json({ success: false, error: error });
  }
});

userRouter.post("/updateBalance/:chatId", async (req, res) => {
  try {
    const { balance } = req.body;
    const { chatId } = req.params;

    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist" });
    }

    //Check if last daily limit stop time is today
    if (isSameDay(new Date().toISOString())) {
      return res
        .status(401)
        .json({ success: true, message: "Daily limit exceeded!" });
    }

    // check if taps today has exceed daily tap limit
    const adminRules = await AdminRules.find();
    if (userDetails.tapsToday + balance > adminRules[0].dailyTapLimit) {
      //Reset taps today
      userDetails.tapsToday = 0;
      userDetails.lastDailyLimitStopTime = new Date();
      userDetails.balance += balance;
      await userDetails.save();
      return res
        .status(200)
        .json({ success: true, message: "Balance updated" });
    }

    //Otherwise, increase balance and taps today
    userDetails.tapsToday += balance;
    userDetails.balance = balance;
    await userDetails.save();
    res.status(200).json({ success: true, message: "Balance updated" });
  } catch (error) {
    console.log("Server error\n", error);
    res.status(500).json({ success: false, error: error });
  }
});

userRouter.post("/saveWallet/:chatId", async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const {chatId} = req.params
    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist" });
    }

    if (!walletAddress) {
      return res
        .status(401)
        .json({ success: false, error: "Wallet address is required" });
    }

    userDetails.walletAddress = walletAddress
    await userDetails.save()
    res.status(200).json({ success: true, message: "Wallet saved" });
  } catch (error) {
    console.log("Server error\n", error);
    res.status(500).json({ success: false, error: error });
  }
});
module.exports = userRouter;
