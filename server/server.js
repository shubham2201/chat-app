const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');
});

io.on('disconnect',(socket)=>{
  console.log('user disconnected');
});

server.listen(port,()=>{
  console.log(`Server is listening on port ${port}.`);
});
