const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');


// Configuraciones
app.set("port", process.env.PORT || 3000);

app.use(cors());

// Ruta estatica
app.use(express.static(path.join(__dirname, "public")));

// Inicio de Servidor
console.log(`Server on port ${app.get("port")}`)
const server = app.listen(app.get("port"), () => {
})


// Configuracion con Socket.io
const socketIo = require("socket.io");


const io = require('socket.io')(server, {
    cors: {
      origin: "https://chat-usando-socket-io.vercel.app/", // El dominio de tu cliente
      methods: ["GET", "POST"]
    }
  });
  

io.on("connection", (socket) => {
    console.log("Nuevo Usuario conectado", socket.id);
    
    socket.on('chat:messege',(data)=>{
        io.sockets.emit('chat:message', data)
    })
})

