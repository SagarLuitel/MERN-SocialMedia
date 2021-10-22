const router = require('express').Router()
const  userController= require('./../controller/userController')

router.get('/',userController.get_all)
router.post('/signup',userController.user_signup)
router.post('/login',userController.user_login)
router.post('/follow',userController.follow_user)
module.exports = router;