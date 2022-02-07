const { readdirSync } = require("fs");
const db = require("../models");
const Post = db.posts;
const User = db.users;

exports.deletePost = (req, res, next) => {
 
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
   return Post.findAll({
   // order: [["createdAt", "DESC"]],
    include: ["user"],
    where: { userId: req.params.userId },
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json(error));
};

exports.getAllPosts = (req, res, next) => {
  return Post.findAll({
    include: [ "user"],
  })
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      return res.status(500).json({});
    });
};



exports.updatePost = (req, res, next) => {
  const id = req.params.id;
    Post.update( req.body,{
      where: { userId: id }
    })
    .then(num => {
      if (num == 1) {
      res.send({
        message: "post mise a jour "
      });
      } else {
        res.send({
          message: "impossible de mettre a jour le post n'existe pas"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "errror"
      });
    });
  };