
const db = require("../models");
const User = db.users;
const Comment = db.comments;

exports.deleteComment = (req, res, next) => {                                       
  Comment.findOne({ where: { id: req.params.id } }).then((comment) => {           // recuperation de l'id du createur du commentaire 
    const commentUserId = comment.userId;
    if (req.token === commentUserId || req.admin === true ) {                    // Si l'userId de la requete et le meme que le createur du commentaire 
      Comment.destroy({ where: { id: req.params.id } })                           // ont supprime le commentaire avec son id
        .then(() => res.status(200).json({ message: "commentaire supprimé !" }))
        .catch((error) => res.statuse(400).json({ error }));
    } else {                                                                      // Sinon ont renvoie une erreur 
      res.status(400).json({ error: "Vous n'avait pas la permission" });
    }
  });
};

exports.createComment = (req, res, next) => {
  Comment.create({
    postId: req.body.postId,
    comment: req.body.comment,
    userId: req.body.userId,
  })

    .then(() => res.status(201).json({ message: "commentaire crée!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    include: ["user"],
    where: { postId: req.params.postId },
  })
    .then((comments) => {
      const msg = "Voici les commentaires";
      res.status(200).json({ msg, comments });
    })
    .catch((error) => res.status(404).json({ msg: "Impossible d'afficher les commentaires, il y a eu une erreur", error }));
};
