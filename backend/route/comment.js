const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require("../controllers/comment");

router.post("/", commentCtrl.createComment);

//requete pour ciblé et afficher un element grace a son id
router.get("/:postId",auth , commentCtrl.getAllComments);

//requete pour supprimer un objet existant
router.delete("/:id",auth , commentCtrl.deleteComment);

module.exports = router;
