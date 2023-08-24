const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});
app.use(cors());
app.use(express.json());
app.use(express.static("src"));

const UserRouter = require("./router/UserRouter");
const SpecialityRouter = require("./router/SpecialityRouter");
const DoctorRouter = require("./router/DoctorRouter");
const ScheduleRouter = require("./router/ScheduleRouter");
const BookingRouter = require("./router/BookingRouter");
const DoctorRegisRouter = require("./router/DoctorRegisRouter");
const ChatUserRouter = require("./router/ChatUserRouter");

app.use(UserRouter);
app.use(SpecialityRouter);
app.use(DoctorRouter);
app.use(ScheduleRouter);
app.use(BookingRouter);
app.use(DoctorRegisRouter);
app.use(ChatUserRouter);

const port = process.env.PORT;
http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

let onlineUsers = [];
io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("newUser", (data) => {
        onlineUsers.push({
            username: data.username,
            socketID: data.socketID,
        });
        console.log(onlineUsers);

        io.emit("newUserResponse", onlineUsers);
    });

    socket.on("sendMessage", (data) => {
        console.log(data);

        io.emit("messageResponse", data);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
        onlineUsers = onlineUsers.filter((user) => user.socketID !== socket.id);
        io.emit("newUserResponse", onlineUsers);
        socket.disconnect();
    });

    // // listen to a connection
    // socket.on("addNewUser", (userId) => {
    //     !onlineUsers.some((user) => user.userId === userId) &&
    //         onlineUsers.push({
    //             userId,
    //             socketId: socket.id,
    //         });
    //     console.log("onlineUser", onlineUsers);
    //     io.emit("getOnlineUsers", onlineUsers);
    // });

    // // // add message
    // // socket.on("sendMessage", (message) => {
    // //     const user = onlineUsers.find(
    // //         (user) => user.userId === message.recipientId
    // //     );
    // //     if (user) {
    // //         io.to(user.socketId).emit("getMessage", message);
    // //         io.to(user.socketId).emit("getNotification", {
    // //             senderId: message.senderId,
    // //             isRead: false,
    // //             date: new Date(),
    // //         });
    // //     }
    // // });

    // socket.on("disconnect", () => {
    //     // onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    //     // io.emit("getOnlineUser", onlineUsers);
    //     console.log("user disconnected");
    // });
});
