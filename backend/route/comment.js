const express = require('express');
const router = express.Router();

const commentCtrl=require('../controllers/comment');

router.post('/',commentCtrl.createComment);

//requete pour ciblé et afficher un element grace a son id
router.get('/:postId',commentCtrl.getAllComments);

//requete pour supprimer un objet existant
router.delete('/:id',commentCtrl.deleteComment );

module.exports = router; 