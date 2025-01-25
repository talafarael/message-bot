const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  timeSendGlobalCall: { type: Date, default: Date.now },
  chatId: { type: Number, required: true, unique: true },
  leader: { type: String, required: true },
  timeSendGlobalCheckUser: { type: Date, default: Date.now },
  users: [String],
});

module.exports = mongoose.model("Chat", chatSchema);
