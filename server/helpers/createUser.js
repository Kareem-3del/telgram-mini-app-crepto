const User = require("../models/userModel");
const handleError = require("./handleError");

module.exports = createUser = async (data) => {
  const { first_name, last_name, username, id } = data.from;
  try {
    
    const newUser = new User({
      chatId: 1234,
      firstName: first_name || null,
      lastName: last_name || null,
      username:username || "No name",
    });

    await newUser.save();
  } catch (error) {
    handleError(error, data);
  }
};
