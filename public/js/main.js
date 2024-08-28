const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.querySelector("#room-name");
const usersList = document.querySelector("#users");

// Get username and room name
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username);
console.log(room);

// SOCKET IO
const socket = io();

// Joining chat room
socket.emit("joinRoom", { username, room });

socket.on("message", (message) => {
  console.log(message);

  renderMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = event.target.elements.msg.value;

  // Emit message to the server
  socket.emit("chatMessage", message);

  // Clear
  event.target.elements.msg.value = "";
  event.target.elements.msg.focus();
});

// Output message to view
function renderMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${msg.username} <span>${msg.time}</span></p>
      <p class="text">
        ${msg.text}
      </p>
  `;

  chatMessages.appendChild(div);
}
