
//Just basic imports
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST"]
  }
});

app.use(cors());

//Stores all messagess to be displayed in the chat space
let messages = [];

io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send existing messages to new user
  socket.emit('all_messages', messages);
  
  // Handle new message
  socket.on('send_message', (message) => {
    message.time = new Date().toLocaleTimeString();
    messages.push(message);
    io.emit('new_message', message); // Broadcast to all clients
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));