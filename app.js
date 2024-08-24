const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const formatMessage = require("./utils/message");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  const botName = "ChatBot";

  // Welcome new user
  socket.emit("message", formatMessage(botName, "Welcome to Chat App"));

  // Inform other when a new user connects to the chat
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "New user joined to the chat")
  );

  // DISCONNECT
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user left the chat"));
  });

  // Listen to chatMessage event
  socket.on("chatMessage", (message) => {
    io.emit("message", formatMessage("User", message));
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
