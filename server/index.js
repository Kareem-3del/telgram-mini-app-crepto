const { Telegraf } = require("telegraf");
require("dotenv/config");
const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Queue = require("queue-promise");
const handleError = require("./helpers/handleError");
const showMenu = require("./helpers/showMenu");
const showAdminMenu = require("./helpers/showAdminMenu");

const initUser = require("./helpers/initUser");
const handleReferral = require("./helpers/handleReferral");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const userAuth = require("./middlewares/userAuth");
const AdminRules = require("./models/adminRulesModel");
const adminRouter = require("./routes/adminRouter");

//MIDDLEWARES
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" })); // Increase JSON body limit
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Increase URL-encoded body limit

const bot = new Telegraf(process.env.BOT_TOKEN);
const adminBot = new Telegraf(process.env.ADMIN_BOT_TOKEN);

// Create a queue instance
const queue = new Queue({
  concurrent: 30, // Process one request at a time
  interval: 1000, // Interval between dequeue operations (1 second)
});

//Routes
app.use("/user", userAuth, userRouter);
app.use("/task", userAuth, taskRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

bot.start(async (ctx) => {
  queue.enqueue(async () => {
    try {
      // If user clicked a referral link
      if (ctx.payload) {
        return await handleReferral(ctx);
      }

      //Creates an account for new users
      await initUser(ctx);

      await showMenu(ctx);
    } catch (error) {
      console.log(error);
      handleError(error, ctx);
    }
  });
});

adminBot.start(async (ctx) => {
  queue.enqueue(async () => {
    try {
      showAdminMenu(ctx);
    } catch (error) {
      console.log(error);
      handleError(error, ctx);
    }
  });
});

bot.telegram.setMyCommands([
  { command: "/start", description: "Start the test bot" },
]);

adminBot.telegram.setMyCommands([
  { command: "/start", description: "Start the admin bot" },
]);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

//Connect to DB
const URI = process.env.URI;
mongoose
  .connect(URI, { dbName: "w-coin_db" })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// Log a message when the bot is connected
bot.telegram
  .getMe()
  .then((botInfo) => {
    console.log(`Bot ${botInfo.username} is connected and running.`);
    bot.launch();
  })
  .catch((err) => {
    console.error("Error connecting bot:", err);
  });

//Connect admin bot
adminBot.telegram
  .getMe()
  .then((botInfo) => {
    console.log(`Admin Bot ${botInfo.username} is connected and running.`);
    adminBot.launch();
  })
  .catch((err) => {
    console.error("Error connecting admin bot:", err);
  });
