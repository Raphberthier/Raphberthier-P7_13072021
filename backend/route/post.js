const express = require('express');
const router = express.Router();


const postCtrl=require('../controllers/post');
const auth = require('../middleware/auth');

router.get('/',postCtrl.getAllPosts);

router.post('/post', postCtrl.createPost);

router.get('/:userId',postCtrl.findAllPostUser);

router.delete('/:id',auth, postCtrl.deletePost );

module.exports = router;