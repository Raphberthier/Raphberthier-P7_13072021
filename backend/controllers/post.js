const db = require("../models");
const Post = db.posts;
const User = db.users;

exports.deletePost = (req, res, next) => {
  // nous utilisons l'ID que nous recevons comme paramètre pour accéder au post correspondant dans la base de données
  Post.findOne({ where: { id: req.params.id } });

  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "post supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
  Post.create({
   
    userId: req.body.userId,
    content: req.body.content,
    title: req.body.title,
  })

    .then((post) => res.status(201).json(post)) 
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

exports.findAllPostUser = (req, res, next) => {
   Post.findAll({
    order: [["createdAt", "DESC"]],
    include: {
      model: User,
    },
    where: { userId: req.params.userId },
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json(error));
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
    include: {
      model: User,
    },
  })
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      return res.status(500).json({});
    });
};

exports.modifyPost = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((post) => {
      if (!post) {
        res.status(404).json({
          error: "No such Post!",
        });
      } else if (
        post.userId !== req.auth.userId &&
        req.auth.userRole !== "admin"
      ) {
        res.status(403).json({
          error: "Unauthorized request!",
        });
      
      } else if (!req.file) {
        const postToUpdate = post;
        postToUpdate
          .update({
            title: req.body.title,
          })
          .then(() =>
            res
              .status(201)
              .json("Post modifié avec succès ")
          )
          .catch((error) => res.status(501).json(error));
      }
    })
    .catch((error) => res.status(502).json({ error }));
};
