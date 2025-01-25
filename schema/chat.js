const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  timeSendGlobalCall: { type: Date },
  lider: { type: String },
  users: [
    {
      userId: { type: String },
      lastMessage: { type: Date },
    },
  ],
});

const User = mongoose.model("Chat", chatSchema);
