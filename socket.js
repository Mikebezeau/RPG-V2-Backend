import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { addMessage, getChannelMessages } from "./users/chat/messages.js";
import { channels, addUserToChannel } from "./users/chat/channels.js";
import { addUser, removeUser } from "./users/users.js";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 8080;

io.on("connection", (socket) => {
  // Get nickname and channel.
  const { nickname, channel } = socket.handshake.query;
  console.log(`${nickname} connected`);
  // Join the user to the channel.
  socket.join(channel);
  addUser(nickname, socket.id);
  addUserToChannel(channel, nickname);

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`${nickname} disconnected`);
    removeUser(nickname);
  });

  socket.on("CHANNEL_SWITCH", (data) => {
    const { prevChannel, channel } = data;
    if (prevChannel) {
      socket.leave(prevChannel);
    }
    if (channel) {
      socket.join(channel);
    }
  });

  socket.on("MESSAGE_SEND", (data) => {
    addMessage(data);
    const { channel } = data;
    socket.broadcast.to(channel).emit("NEW_MESSAGE", data);
  });
});

app.get("/channels/:channel/messages", (req, res) => {
  const allMessages = getChannelMessages(req.params.channel);

  return res.json({ allMessages });
});

app.get("/getChannels", (req, res) => {
  return res.json({ channels });
});

server.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
