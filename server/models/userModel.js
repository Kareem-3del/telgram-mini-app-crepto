const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    referrals: [
      // {
      //   username: String,
      //   firstname: String,
      //   lastname: String,
      //   commission: number,
      //   chatId: number,
      // },
    ],
    chatId: {
      type: Number,
      required: true,
    },
    completedTasks: [String], //ids of completed tasks
    walletAddress: {
      type: String,
      default: null,
    },
    lastDailyLimitStopTime:{
      type:Date,
      default:null
    },
    tapsToday:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
