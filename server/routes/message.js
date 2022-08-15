const { addMessage, getMessages } = require('../controllers/messageController')
//创建路由对象
const router = require('express').Router()

//挂载具体路由
router.post('/addmsg/', addMessage)
router.post('/getmsg/', getMessages)

//导出路由对象
module.exports = router
