const models =require('../models/index.js');
const db = require("../models");
const User = db.users;
const Comment = db.comments;

exports.deleteComment = (req, res, next) => {
    Comment.findOne ({ 
        where: { id: req.params.id }})          
          Comment.destroy({where:{id: req.params.id }})
            .then(() => res.status(200).json({ message: 'commentaire supprimé !'}))
            .catch(error => res.status(400).json({ error }));
    
};

exports.createComment = (req, res, next) => {
    

     Comment.create ({
        
        postId: req.body.postId,
        comment: req.body.comment,
        userId: req.body.userId,
       // firstName: user.fristName,
       // lastName: req.body.user.lastName,
    })

   
        .then(() => res.status(201).json({ message: "commentaire crée!" }))
        .catch(error => res.status(400).json({ error }));
};

/*exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        include:
            ["users"]
        ,
         where: { postId: req.params.postId}
        })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(500).json(error))
};*/

exports.getAllComments = (req, res, next) => {  
    Comment.findAll({
        
        where:{ postId: req.params.postId}
    })
    .then(comments => {
        const msg = 'Voici les commentaires'
        res.status(200).json({msg,comments})
    })
    .catch(error => res.status(404).json({msg: 'Impossible d\'afficher les commentaires, il y a eu une erreur' ,error}));
  };