const express = require("express");
const path = require("path");
const http = require("http");
const {Server} = require("socket.io");
const db = require("./config/connection");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket)=> {
    console.log(`user connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    })
});

db();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/api", userRoutes)

const PORT = 5000 || process.env.PORT

server.listen(PORT, () => {
    console.log(`Running Sever at Port ${PORT}`)
})