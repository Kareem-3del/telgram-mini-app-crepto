const express = require("express");
const Task = require("../models/taskModel");
const User = require("../models/userModel");
const AdminRules = require("../models/adminRulesModel");
const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json({ success: true, data: allTasks });
  } catch (error) {
    console.log("Server error\n", error);
    res.status(500).json({ success: false, error: error });
  }
});

taskRouter.post("/new", async (req, res) => {
  const {
    chatId,
    name,
    logo,
    category,
    telegramChannelLink,
    youtubeVideoLink,
    telegramGroupLink,
    xLink,
    description
  } = req.body;

  const newTask = new Task({
    name,
    category,
    creatorId: chatId,
    logo,
    status: "Pending",
    description
  });

  if (category == "X") {
    newTask.xLink = xLink;
  }

  if (category == "Youtube") {
    newTask.youtubeVideoLink = youtubeVideoLink;
  }

  if (category == "Telegram") {
    newTask.telegramChannelLink = telegramChannelLink;
    newTask.telegramGroupLink = telegramGroupLink;
  }
  try {
    await newTask.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Server error\n", error);
    res.status(500).json({ success: false, error: error });
  }
});

taskRouter.post("/do/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { chatId } = req.body;

    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist" });
    }

    const taskExists = await Task.findById(taskId);
    if (!taskExists) {
      return res
        .status(404)
        .json({ success: false, error: "Task does not exist" });
    }

    //Check if user already did this task
    if (userDetails.completedTasks.includes(taskId)) {
      return res
        .status(404)
        .json({ success: false, error: "You've already done this task" });
    }

    //add to user's completed tasks record
    userDetails.completedTasks.push(taskId);

    const adminRules = await AdminRules.find();
    //reward user
    userDetails.balance += adminRules[0].taskPoints;

    await userDetails.save();
    res.status(200).json({ success: true, data: userDetails });
  } catch (error) {
    console.log("Server error\n", error);
    res.status(500).json({ success: false, error: error });
  }
});

module.exports = taskRouter;
