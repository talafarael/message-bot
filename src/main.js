const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");
const Chat = require("./schema/chat.js");
const mongoUrl =
  "mongodb+srv://boombroks:123456780a@cluster0.cbzop.mongodb.net/";

const token = "7515386079:AAG-CzbLp1ittsZccaUEFrkl8R2yrMZDrRM";
const bot = new TelegramBot(token, { polling: true });

async function connectDB() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Connection error:", err);
  }
}
setInterval(
  async () => {
    const chats = await Chat.find();
    chats.forEach(async (element) => {
      console.log(
        new Date(element.timeSendGlobalCall).getTime() + 60 * 60 * 1000,
      );
      const nowTime = new Date();

      if (
        nowTime >=
        new Date(element.timeSendGlobalCall).getTime() + 60 * 60 * 1000
      ) {
        await bot.sendMessage(element.chatId, "time to meet");

        element.timeSendGlobalCall = new Date();
        await element.save();
      }
    });
  },
  60 * 60 * 1000,
);
async function start() {
  await connectDB();

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Welcome! How can I assist you? You want to create your team or come from tea?",
    );
  });

  bot.onText(/\/get_chat/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Your chat ID is: ${chatId}`);
  });

  bot.onText(/\/join_group/, async (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId);
    const userId = msg.from.id;
    const firstName = msg.from.first_name;
    const chat = await Chat.findOne({ chatId: chatId });
    if (chat) {
      console.log(chat);
      bot.sendMessage(chatId, "chat was create ");
      return;
    }
    const newChat = new Chat({
      chatId: chatId,
      timeSendGlobalCall: Date.now(),
      leader: userId,
      timeSendGlobalCheckUser: Date.now(),
      users: [userId],
    });
    await newChat.save();
    bot.sendMessage(chatId, "You have joined the group!");
  });
  bot.onText();
  console.log("Bot is running...");
}

start();
