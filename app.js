
//INTRODUCTION TO SOCKET CODE

/* var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  console.log('connection: ' + 'True');
  
  
  //sending and recceiving on channel
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });

  //Trying A c
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    //console.log('message: ' + msg);
  }); 
  
  //Rooms
  const gamesRooms = ["pubg", 'callofduty'];

  io.of('/games').on("connection", (socket) => {
    console.log("Say something")  
    socket.emit("Welcome", "Games Gruops");
    
    //Creating rooms
    socket.on("joinRoom", (room) => {
      if(gamesRooms.includes(room)){
        socket.join(room);
        
        //emitting info to memebers of Group: /games
        io.of("/games").in(room).emit("newUser", "a player just joined: " + room);
        return socket.emit("success", "You have joined Room: " + room);
      }else {
        return socket.emit("no room with name" + name)
      }

    })
  });
  
  socket.on('disconnect', (data ) => {
      console.log('user disconnected');
  });
  
});

http.listen(3000, () => {
  console.log('listening on *:3000');
}); 
*/




//////////////////////////////////////////////////////////////////////////////////////////////
//REAL TIME APP TRY CODE
///////////////////////////////////////////////////////////////////////////////////


const express = require ("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port  = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

//api call
const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://api.covid19api.com/total/country/ghana");
    socket.emit("API", res.data[res.data.length-1].Confirmed);
    console.log(res.data[res.data.length-1]);
  }catch(error){
    //console.error('Error: ${error.code}');
  }
};  


io.on("connection", socket => {
  console.log("New Client connected"), setInterval( () => getApiAndEmit(socket,2000));
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log('Listening on port ${port}'));