const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const PORT = 3500;

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

// database
let messages = [];

io.on('connection', (socket) => {
    console.log("novo usuário foi conectado: ", socket.id);

    socket.emit("previousMessage", messages);

    socket.on("sendMessage", (message) => {
        console.log(message);
        messages.push(message);
        socket.broadcast.emit("receivedMessage", message);
    });

    socket.on('disconnect', () => {
        console.log("usuário desconectado.");
    });
});

server.listen(PORT, () => {
    console.log(`listening server on port ${PORT}`);
});