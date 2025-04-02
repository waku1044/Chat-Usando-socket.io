const socket = io();

const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit("chat:messege", { username: socket.id, message: message });
  }

  messageInput.value = "";
});
// Función para agregar un mensaje al chat
function addMessage(message, sender) {
  const messageElement = document.createElement("div");

  messageElement.classList.add("message", sender);

  messageElement.innerText = message;
  chatBox.appendChild(messageElement);

  // Desplazar hacia abajo el chat cada vez que se agregue un nuevo mensaje
  chatBox.scrollTop = chatBox.scrollHeight;
}

socket.on("chat:message", (data) => {
    
  addMessage(data.message, (socket.id === data.username)?'user':'bot');
});
