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
const io = new Server(server);

db();

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes)


//  Run when clients connect
io.on('connection', socket => {
    console.log("web socket connection");
})

const PORT = 5000 || process.env.PORT

server.listen(PORT, () => {
    console.log(`Running Sever at Port ${PORT}`)
})