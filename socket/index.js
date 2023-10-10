import {Server} from "socket.io";

const io = new Server(9000, {
   cors:{
        origin: "http://localhost:3000"
    },
})

let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
    
}

const getUser = (userId) =>{
    return users.find(user => user.sub === userId)
}

io.on('connection',  (socket) => {
    console.log('user connected')
    
    socket.on("addUser",userData =>{
      addUser(userData,socket.id)

        console.log('active users-socket-in',users)
        io.emit("getUsers",users)
    })
    console.log('active users',users)
    
    socket.on("sendMessage",data=>{
    // console.log('sendMessage data--',data)
        
        const user = getUser(data.receiverId);
        console.log('user in socket - ',user)
        // io.to(user.socketId).emit('getMessage',data)
    })
    
})