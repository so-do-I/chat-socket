const mongoose = require("mongoose");

//建立聊天消息模型
const MessageSchema = mongoose.Schema(
  {
    //字符型的信息是必须的
    message: {
      text: { type: String, required: true },
    },
    users: Array,//接收方
    //发送方
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,//时间戳
  }
);

module.exports = mongoose.model("Messages", MessageSchema);