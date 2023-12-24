const { createServer } = require("http")
const { Server } = require("socket.io")

const httpServer = createServer()
const io = new Server(httpServer, { cors: "http://localhost:3000" })
let onlineUser = []

io.on("connection", (socket) => {

    //   listen to a connection
    socket.on("addNewUser", (userId) => {
        if (!onlineUser.some(user => user.userId === userId) && userId) {
            onlineUser.push({
                userId: userId,
                socketId: socket.id
            })
        }
        console.log(onlineUser)
        io.emit("onlineUsers", onlineUser)
    })

    socket.on("sendMessage", (message) => {
        const user = onlineUser.find((user) => Number(user.userId) === Number(message.recipientId))
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
            io.to(user.socketId).emit("getNotification", {
                senderId: message.sender_id,
                isRead: false,
                date: new Date()
            })
        }
    })



    socket.on("disconnect", () => {
        onlineUser = onlineUser.filter((user) => user.socketId !== socket.id)
        io.emit("onlineUsers", onlineUser)
    })

})

httpServer.listen(5000)