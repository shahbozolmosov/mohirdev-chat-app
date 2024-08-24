const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  // Welcome new user 
  socket.emit("message", "Welcome to Chat App");

  // Inform other when a new user connects to the chat
  socket.broadcast.emit("message", "New user joined to the chat");

  // DISCONNECT
  socket.on('disconnect', () => {
    io.emit('message', 'A user left the chat')
  })
  
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
