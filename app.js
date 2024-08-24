const express = require('express');
const socketio = require('socket.io');
const http =require('http');
const path = require('path');

const app = express();
const server  =http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
  const botName = 'ChatBot';

  socket.emit('message', 'Welcome to Chat app');
  
  // socket.join('joinRomo')
});

