const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');


  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app!!'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New member is added'));

  socket.on('createMessage',(msg)=>{
    console.log('createMessage',msg);
    io.emit('newMessage',generateMessage(msg.from,msg.text));

    // socket.broadcast.emit('newMessage',{
    //   from: msg.from,
    //   text: msg.text,
    //   createsAt: new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log('user disconnected');
  });
});

server.listen(port,()=>{
  console.log(`Server is listening on port ${port}.`);
});
