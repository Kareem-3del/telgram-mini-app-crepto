const express = require("express");
const AdminRules = require("../models/adminRulesModel");
const Task = require("../models/taskModel");
const User = require("../models/userModel");
const adminRouter = express.Router();

// Middleware for detailed error logging
const errorHandler = (res, error, message = "Server error") => {
  console.error(message, error);
  res.status(500).json({success: false, error: error.message || error});
};

//Fetch all tasks(Ads)
adminRouter.get("/ads", async (req, res) => {
  try {
    const allAds = await Task.find().lean();
    res.status(200).json({success: true, data: allAds});
  } catch (error) {
    errorHandler(res, error);
  }
});

//Fetch a task(Ad)
adminRouter.get("/ads/:taskId", async (req, res) => {
  try {
    const {taskId} = req.params;
    const taskDetails = await Task.findById(taskId).lean();

    if (!taskDetails) {
      return res.status(404).json({success: false, error: "Task not found."});
    }

    res.status(200).json({success: true, data: taskDetails});
  } catch (error) {
    errorHandler(res, error);
  }
});

// Fetch admin rules
adminRouter.get("/rules", async (req, res) => {
  try {
    const rules = await AdminRules.findOne().lean();

    if (!rules) {
      return res.status(404).json({success: false, error: "Rules not found."});
    }

    res.status(200).json({success: true, data: rules});
  } catch (error) {
    errorHandler(res, error);
  }
});

//Update admin rules
adminRouter.patch("/rules", async (req, res) => {
  try {
    const {updates} = req.body;

    if (!updates || typeof updates !== "object") {
      return res.status(400).json({success: false, error: "Invalid updates format."});
    }

    const updatedRules = await AdminRules.findOneAndUpdate({}, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedRules) {
      return res.status(404).json({success: false, error: "Rules not found."});
    }

    res.status(200).json({success: true, data: updatedRules});
  } catch (error) {
    errorHandler(res, error);
  }
});

//Update Task(Approve, Decline, Edit)
adminRouter.patch("/ads/:taskId", async (req, res) => {
  try {
    const {taskId} = req.params;
    const {updateData} = req.body;

    if (!updateData || typeof updateData !== "object") {
      return res.status(400).json({success: false, error: "Invalid update data format."});
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({success: false, error: "Task not found."});
    }

    res.status(200).json({success: true, data: updatedTask});
  } catch (error) {
    errorHandler(res, error);
  }
});

//Delete task
adminRouter.delete("/ads/:taskId", async (req, res) => {
  try {
    const {taskId} = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({success: false, error: "Task not found."});
    }

    res.status(200).json({success: true, message: "Task deleted successfully."});
  } catch (error) {
    errorHandler(res, error);
  }
});

//Create Task
adminRouter.post("/ads/new", async (req, res) => {
  try {
    const {
      chatId,
      name,
      logo,
      category,
      telegramChannelLink,
      youtubeVideoLink,
      telegramGroupLink,
      xLink,
    } = req.body;

    if (!chatId || !name || !category || !logo) {
      return res.status(400).json({success: false, error: "Missing required fields."});
    }

    const newTask = new Task({
      name,
      category,
      creatorId: chatId,
      logo,
      status: "Approved",
    });

    if (category === "X") {
      newTask.xLink = xLink;
    } else if (category === "Youtube") {
      newTask.youtubeVideoLink = youtubeVideoLink;
    } else if (category === "Telegram") {
      newTask.telegramChannelLink = telegramChannelLink;
      newTask.telegramGroupLink = telegramGroupLink;
    }

    await newTask.save();
    res.status(201).json({success: true, data: newTask});
  } catch (error) {
    errorHandler(res, error);
  }
});

//Fetch users
adminRouter.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find().lean();
    res.status(200).json({success: true, data: allUsers});
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = adminRouter;
