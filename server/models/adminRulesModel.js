const { Schema, model } = require("mongoose");

const adminRulesSchema = new Schema({
  referralPoints: {
    type: Number,
    default: 1,
  },
  taskPoints: {
    type: Number,
    default: 1,
  },
  dailyTapLimit: {
    type: Number,
    default: 10,
  },
  maxTokensForAllUsers: {
    type: Number,
    default: 20000000,
  },
});

const AdminRules = model("AdminRules", adminRulesSchema);
module.exports = AdminRules;
