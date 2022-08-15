const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const messageRouter = require('./routes/message')
const socket = require('socket.io')
const app = express() //创建服务器
require('dotenv').config()

app.use(cors())//配置cors中间件解决跨域
app.use(express.json())//解析JSON格式的请求数据体

//连接数据库
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(() => {
    console.log('DB start')
}).catch((err) => {
    console.log(err)
})

//注册路由模块，添加访问前缀
app.use('/api/auth', authRouter)
app.use('/api/messages',messageRouter)

//监听：5000端口
const server = app.listen(process.env.PORT, () => {
    console.log(`start ${process.env.PORT}`)
})

const io = socket(server, {
    //配置跨域
    cors: {
        origin: 'http://localhost:3000',
        credentials:true
    }
})

global.onlineUsers = new Map()
//注册连接事件
io.on('connection', (socket) => {
    global.chatSocket = socket
    //添加用户
    socket.on('add-user', (userId) => {
        //socket.id--客户端连接时生成的唯一id
        onlineUsers.set(userId,socket.id)
    })
    //发送信息
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            //服务器推送收到的消息
            socket.to(sendUserSocket).emit('msg-receive',data.msg)
        }
    })
})