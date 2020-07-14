const io = require("socket.io-client");

let socket = io.connect("http://localhost:3000");
let games = io.connect("http://localhost:3000/games");

/*
socket.on('connect', () => {
    console.log('connected');
});

socket.on("chat message", (data) => {
    console.log("Received: ", data);
});
*/

//for namespaces
games.on('connect', () => {
    console.log('connected');
});

games.on("Welcome", (info) => {
    console.log("Received: ", info);
});

//client request to join room
games.emit("joinRoom", "pubg");
games.on("newUser", (info) => console.log(info));

games.on("err", (err) => console.log(err));
games.on("success", (res) => console.log(res));

