const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.querySelector("#room-name");
const usersList = document.querySelector("#users");

// Get username and room name
// const {username, room} = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });

// SOCKET IO
const socket = io();

// Joining chat room
// socket.emit('joinRoom', 'Shaboz')

socket.on("message", (message) => {
  console.log(message);

  renderMessage(message);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = event.target.elements.msg.value;

  // Emit message to the server
  socket.emit("chatMessage", message);
});

// Output message to view
function renderMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">Bexruz <span>9:12pm</span></p>
      <p class="text">
        ${msg}
      </p>
  `;

  document.querySelector(".chat-messages").appendChild(div);
}
