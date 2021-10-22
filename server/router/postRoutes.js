const router = require('express').Router()
const  postController= require('./../controller/postController')


router.get('/',postController.get_all)
router.post('/create',postController.create_post)
router.post('/like',postController.handle_like)
router.post('/post',postController.get_by)
router.post('/post',postController.get_or)
router.post('/comment',postController.new_comment)

module.exports = router;