const chatForm = document.querySelector('#chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('#room-name')
const usersList = document.querySelector('#users')

// Get username and room name
// const {username, room} = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });

// SOCKET IO
const socket = io();

// Joining chat room
socket.emit('joinRoom', 'Shaboz')

socket.on('message', (message) => {
  console.log(message);
})