const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ["X", "Telegram", "Youtube"],
  },

  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  websiteLink: {
    type: String,
  },
  telegramChannelLink: {
    type: String,
  },
  telegramGroupLink: {
    type: String,
  },
  youtubeVideoLink: {
    type: String,
  },
  xLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Approved", "Declined", "Pending"],
  },
  creatorId: {
    type: Number,
  },
});

const Task = model("Task", taskSchema);
module.exports = Task;
