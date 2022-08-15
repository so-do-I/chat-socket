const {register,login, setAvatar, getAllUsers,logOut}=require('../controllers/userController')

//创建路由对象
const router = require('express').Router()

//挂载具体路由
router.post('/register', register)
router.post('/login', login)
router.post('/setavatar/:id', setAvatar)
router.get('/allusers/:id', getAllUsers)
router.get('/logout/:id',logOut)

//导出路由对象
module.exports = router;